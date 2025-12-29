import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import type { Religion } from "../data/religions";
import { religions } from "../data/religions";

interface TimelineProps {
  onSelectReligion: (religion: Religion) => void;
  selectedReligion: Religion | null;
  hiddenBranches: Set<string>;
}

interface VisibleNode {
  religion: Religion;
  hasChildren: boolean;
  isExpanded: boolean;
}

export function Timeline({ onSelectReligion, selectedReligion, hiddenBranches }: TimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Root branches that are independently toggleable
  const ROOT_BRANCHES = ["judaism", "christianity", "islam"];

  // Filter religions based on hidden branches
  const filteredReligions = religions.filter((r) => {
    let current: Religion | undefined = r;
    while (current) {
      if (hiddenBranches.has(current.id)) {
        return false;
      }
      // Stop at root branches - they're independent trees
      if (ROOT_BRANCHES.includes(current.id)) {
        break;
      }
      current = religions.find((p) => p.id === current?.parentId);
    }
    return true;
  });

  // Build tree, but treat religions whose parent is filtered out as roots
  const filteredIds = new Set(filteredReligions.map(r => r.id));
  const childrenMap = new Map<string, Religion[]>();

  filteredReligions.forEach((religion) => {
    // If parent exists in filtered list, use it; otherwise treat as root
    const parentId = (religion.parentId && filteredIds.has(religion.parentId))
      ? religion.parentId
      : "root";
    if (!childrenMap.has(parentId)) {
      childrenMap.set(parentId, []);
    }
    childrenMap.get(parentId)!.push(religion);
  });

  // Track which nodes are expanded - start with root nodes expanded
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    // Expand Judaism, Christianity, Catholic, and Protestant by default
    initial.add("judaism");
    initial.add("christianity");
    initial.add("catholic");
    initial.add("protestant");
    return initial;
  });

  const toggleExpand = useCallback((religionId: string, nodeX?: number, nodeY?: number) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      const isExpanding = !next.has(religionId);
      if (next.has(religionId)) {
        next.delete(religionId);
      } else {
        next.add(religionId);
      }

      // If expanding and we have coordinates, center on the node
      if (isExpanding && nodeX !== undefined && nodeY !== undefined && svgRef.current && zoomRef.current) {
        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth || 800;
        const height = 600;

        // Calculate transform to center on the node
        const scale = 1;
        const translateX = width / 2 - nodeX * scale;
        const translateY = height / 3 - nodeY * scale; // Put node in upper third

        const newTransform = d3.zoomIdentity.translate(translateX, translateY).scale(scale);
        svg.transition().duration(500).call(zoomRef.current.transform, newTransform);
      }

      return next;
    });
  }, []);

  // Get visible nodes based on expansion state
  const getVisibleNodes = useCallback((): VisibleNode[] => {
    const visible: VisibleNode[] = [];

    function traverse(parentId: string | null) {
      const children = childrenMap.get(parentId || "root") || [];
      children.forEach((religion) => {
        const hasChildren = (childrenMap.get(religion.id) || []).length > 0;
        const isExpanded = expandedNodes.has(religion.id);
        visible.push({ religion, hasChildren, isExpanded });

        if (isExpanded && hasChildren) {
          traverse(religion.id);
        }
      });
    }

    traverse(null);
    return visible;
  }, [childrenMap, expandedNodes]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth || 800;
    const height = 600;
    const margin = { top: 60, right: 100, bottom: 60, left: 100 };

    const visibleNodes = getVisibleNodes();
    const ySpacing = 80;
    const contentHeight = Math.max(height, margin.top + 60 + visibleNodes.length * ySpacing + margin.bottom);

    // Set up SVG with fixed viewport
    svg.attr("height", height).attr("width", "100%");

    // Clear everything first
    svg.selectAll("*").remove();

    // Create a clip path for the viewport
    svg.append("defs")
      .append("clipPath")
      .attr("id", "viewport-clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // Create zoom container
    const zoomContainer = svg.append("g").attr("class", "zoom-container");

    // Create the main content group that will be transformed
    const mainGroup = zoomContainer.append("g").attr("class", "main-group");

    // Calculate time range from visible nodes
    const years = visibleNodes.map(n => n.religion.foundedYear);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const yearRange = maxYear - minYear;
    const padding = Math.max(yearRange * 0.15, 50); // At least 50 years padding
    const domainMin = minYear - padding;
    const domainMax = maxYear + padding;

    // Calculate content width based on year range (more years = wider)
    const contentWidth = Math.max(width, Math.min(2000, 600 + yearRange * 0.5));

    // Time scale - dynamic based on visible religions
    const timeScale = d3
      .scaleLinear()
      .domain([domainMin, domainMax])
      .range([margin.left, contentWidth - margin.right]);

    // Calculate positions
    const nodePositions: Map<string, { x: number; y: number }> = new Map();
    let yOffset = margin.top + 60;

    visibleNodes.forEach((node) => {
      const x = timeScale(node.religion.foundedYear);
      const y = yOffset;
      nodePositions.set(node.religion.id, { x, y });
      yOffset += ySpacing;
    });

    // Size scale for nodes
    const sizeScale = d3.scaleSqrt().domain([0, 2000]).range([10, 40]);

    // Generate dynamic grid lines based on visible range
    const generateGridLines = (min: number, max: number): number[] => {
      const range = max - min;
      let step: number;
      if (range <= 200) step = 25;
      else if (range <= 500) step = 50;
      else if (range <= 1000) step = 100;
      else if (range <= 2000) step = 250;
      else step = 500;

      const lines: number[] = [];
      const start = Math.ceil(min / step) * step;
      for (let y = start; y <= max; y += step) {
        lines.push(y);
      }
      return lines;
    };

    const gridLines = generateGridLines(domainMin, domainMax);
    mainGroup
      .selectAll(".grid-line")
      .data(gridLines)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", (d) => timeScale(d))
      .attr("x2", (d) => timeScale(d))
      .attr("y1", 0)
      .attr("y2", contentHeight)
      .attr("stroke", "#1e293b")
      .attr("stroke-dasharray", "4,4");

    // Draw time axis labels
    mainGroup
      .selectAll(".time-label")
      .data(gridLines)
      .enter()
      .append("text")
      .attr("class", "time-label")
      .attr("x", (d) => timeScale(d))
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("fill", "#64748b")
      .style("font-size", "12px")
      .text((d) => {
        if (d < 0) return `${Math.abs(d)} BCE`;
        if (d === 0) return "0";
        return `${d} CE`;
      });

    // Draw connections
    visibleNodes.forEach((node) => {
      const religion = node.religion;
      if (religion.parentId && nodePositions.has(religion.parentId)) {
        const parentPos = nodePositions.get(religion.parentId)!;
        const childPos = nodePositions.get(religion.id)!;

        const path = d3.path();
        path.moveTo(parentPos.x, parentPos.y);
        const midX = (parentPos.x + childPos.x) / 2;
        path.bezierCurveTo(midX, parentPos.y, midX, childPos.y, childPos.x, childPos.y);

        mainGroup
          .append("path")
          .attr("class", "connection")
          .attr("d", path.toString())
          .attr("fill", "none")
          .attr("stroke", religion.color)
          .attr("stroke-width", 2.5)
          .attr("opacity", 0.6);
      }
    });

    // Draw nodes
    const nodes = mainGroup
      .selectAll<SVGGElement, VisibleNode>(".religion-node")
      .data(visibleNodes, (d) => d.religion.id)
      .enter()
      .append("g")
      .attr("class", "religion-node")
      .style("cursor", "pointer")
      .attr("transform", (d) => {
        const pos = nodePositions.get(d.religion.id);
        return `translate(${pos?.x || 0}, ${pos?.y || 0})`;
      });

    // Node circle
    nodes
      .append("circle")
      .attr("class", "node-circle")
      .attr("r", (d) => sizeScale(d.religion.adherents || 10))
      .attr("fill", (d) => d.religion.color)
      .attr("stroke", (d) => selectedReligion?.id === d.religion.id ? "#fff" : "transparent")
      .attr("stroke-width", 3)
      .attr("opacity", 0.9);

    // Expand/collapse indicator
    nodes
      .filter((d) => d.hasChildren)
      .append("circle")
      .attr("class", "expand-indicator")
      .attr("r", 12)
      .attr("cx", (d) => -(sizeScale(d.religion.adherents || 10) + 8))
      .attr("fill", "#334155")
      .attr("stroke", "#475569")
      .attr("stroke-width", 1);

    nodes
      .filter((d) => d.hasChildren)
      .append("text")
      .attr("class", "expand-text")
      .attr("x", (d) => -(sizeScale(d.religion.adherents || 10) + 8))
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .style("fill", "#e2e8f0")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("pointer-events", "none")
      .text((d) => (d.isExpanded ? "−" : "+"));

    // Node label
    nodes
      .append("text")
      .attr("class", "node-label")
      .attr("x", (d) => sizeScale(d.religion.adherents || 10) + 10)
      .attr("y", 5)
      .style("fill", "#e2e8f0")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .text((d) => d.religion.name);

    // Year label
    nodes
      .append("text")
      .attr("class", "year-label")
      .attr("y", (d) => sizeScale(d.religion.adherents || 10) + 18)
      .attr("text-anchor", "middle")
      .style("fill", "#64748b")
      .style("font-size", "11px")
      .text((d) => {
        if (d.religion.foundedYear < 0) return `${Math.abs(d.religion.foundedYear)} BCE`;
        return `${d.religion.foundedYear} CE`;
      });

    // Event handlers
    nodes
      .on("click", (event, d) => {
        event.stopPropagation();
        onSelectReligion(d.religion);
      })
      .on("dblclick", (event, d) => {
        event.stopPropagation();
        if (d.hasChildren) {
          const pos = nodePositions.get(d.religion.id);
          toggleExpand(d.religion.id, pos?.x, pos?.y);
        }
      });

    // Set up zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        zoomContainer.attr("transform", event.transform);
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    // Calculate initial transform to fit all content
    const scaleX = (width - 40) / contentWidth;
    const scaleY = (height - 40) / contentHeight;
    const initialScale = Math.min(scaleX, scaleY, 1); // Don't zoom in more than 1x
    const initialTransform = d3.zoomIdentity
      .translate((width - contentWidth * initialScale) / 2, 20)
      .scale(initialScale);
    svg.call(zoom.transform, initialTransform);

    // Add UI overlay (outside zoom)
    const overlay = svg.append("g").attr("class", "ui-overlay");

    // Instructions
    overlay
      .append("rect")
      .attr("x", 10)
      .attr("y", height - 35)
      .attr("width", 280)
      .attr("height", 25)
      .attr("rx", 4)
      .attr("fill", "rgba(15, 23, 42, 0.8)");

    overlay
      .append("text")
      .attr("x", 20)
      .attr("y", height - 18)
      .style("fill", "#64748b")
      .style("font-size", "11px")
      .text("Scroll to zoom • Drag to pan • Double-click to expand");

    // Zoom controls
    const controls = overlay.append("g").attr("transform", `translate(${width - 50}, 20)`);

    // Zoom in button
    controls
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 30)
      .attr("height", 30)
      .attr("rx", 4)
      .attr("fill", "#334155")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition().duration(300).call(zoom.scaleBy, 1.3);
      });

    controls
      .append("text")
      .attr("x", 15)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("fill", "#e2e8f0")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .text("+");

    // Zoom out button
    controls
      .append("rect")
      .attr("x", 0)
      .attr("y", 35)
      .attr("width", 30)
      .attr("height", 30)
      .attr("rx", 4)
      .attr("fill", "#334155")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition().duration(300).call(zoom.scaleBy, 0.7);
      });

    controls
      .append("text")
      .attr("x", 15)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .style("fill", "#e2e8f0")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .text("−");

    // Reset button
    controls
      .append("rect")
      .attr("x", 0)
      .attr("y", 70)
      .attr("width", 30)
      .attr("height", 30)
      .attr("rx", 4)
      .attr("fill", "#334155")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition().duration(500).call(zoom.transform, initialTransform);
      });

    controls
      .append("text")
      .attr("x", 15)
      .attr("y", 90)
      .attr("text-anchor", "middle")
      .style("fill", "#e2e8f0")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .text("⟲");

  }, [expandedNodes, getVisibleNodes, onSelectReligion, selectedReligion, toggleExpand, hiddenBranches, filteredReligions]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: "600px",
        background: "#0f172a",
        borderRadius: "12px",
        cursor: "grab",
      }}
    />
  );
}
