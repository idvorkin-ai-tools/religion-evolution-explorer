import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import type { Religion } from "../data/religions";
import { religions, buildReligionTree } from "../data/religions";

interface TimelineProps {
  onSelectReligion: (religion: Religion) => void;
  selectedReligion: Religion | null;
}

interface VisibleNode {
  religion: Religion;
  hasChildren: boolean;
  isExpanded: boolean;
}

export function Timeline({ onSelectReligion, selectedReligion }: TimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const childrenMap = buildReligionTree(religions);

  // Track which nodes are expanded - start with root nodes expanded
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    // Expand Judaism and Christianity by default to show the tree
    initial.add("judaism");
    initial.add("christianity");
    initial.add("protestant");
    return initial;
  });

  const toggleExpand = useCallback((religionId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(religionId)) {
        next.delete(religionId);
      } else {
        next.add(religionId);
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
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };

    const visibleNodes = getVisibleNodes();
    const ySpacing = 70;
    const dynamicHeight = Math.max(450, margin.top + 60 + visibleNodes.length * ySpacing + margin.bottom);

    // Update SVG height
    svg.attr("height", dynamicHeight);

    // Clear and redraw with transition
    svg.selectAll(".main-group").remove();
    const mainGroupMerge = svg.append("g").attr("class", "main-group");

    // Time scale - from 2000 BCE to 2000 CE
    const timeScale = d3
      .scaleLinear()
      .domain([-2000, 2000])
      .range([margin.left, width - margin.right]);

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
    const sizeScale = d3.scaleSqrt().domain([0, 2000]).range([8, 35]);

    // Draw static elements (axis, title) - only once
    svg.selectAll(".static-elements").remove();
    const staticGroup = svg.append("g").attr("class", "static-elements");

    // Draw time axis
    const xAxis = d3
      .axisBottom(timeScale)
      .tickFormat((d) => {
        const year = d as number;
        if (year < 0) return `${Math.abs(year)} BCE`;
        if (year === 0) return "0";
        return `${year} CE`;
      })
      .ticks(10);

    staticGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${dynamicHeight - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#94a3b8")
      .style("font-size", "12px");

    staticGroup.selectAll(".x-axis path, .x-axis line").style("stroke", "#475569");

    // Draw time grid lines
    const gridLines = [-2000, -1500, -1000, -500, 0, 500, 1000, 1500, 2000];
    staticGroup
      .selectAll(".grid-line")
      .data(gridLines)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", (d) => timeScale(d))
      .attr("x2", (d) => timeScale(d))
      .attr("y1", margin.top)
      .attr("y2", dynamicHeight - margin.bottom)
      .attr("stroke", "#1e293b")
      .attr("stroke-dasharray", "4,4");

    // Title
    staticGroup
      .append("text")
      .attr("x", width / 2)
      .attr("y", 24)
      .attr("text-anchor", "middle")
      .text("Abrahamic Religions Timeline")
      .style("fill", "#f1f5f9")
      .style("font-size", "18px")
      .style("font-weight", "600");

    // Legend
    staticGroup
      .append("text")
      .attr("x", width - margin.right - 10)
      .attr("y", margin.top + 10)
      .attr("text-anchor", "end")
      .text("Double-click to expand/collapse")
      .style("fill", "#64748b")
      .style("font-size", "11px");

    // Draw connections with transitions
    mainGroupMerge.selectAll(".connection").remove();

    visibleNodes.forEach((node) => {
      const religion = node.religion;
      if (religion.parentId && nodePositions.has(religion.parentId)) {
        const parentPos = nodePositions.get(religion.parentId)!;
        const childPos = nodePositions.get(religion.id)!;

        const path = d3.path();
        path.moveTo(parentPos.x, parentPos.y);
        const midX = (parentPos.x + childPos.x) / 2;
        path.bezierCurveTo(midX, parentPos.y, midX, childPos.y, childPos.x, childPos.y);

        mainGroupMerge
          .append("path")
          .attr("class", "connection")
          .attr("d", path.toString())
          .attr("fill", "none")
          .attr("stroke", religion.color)
          .attr("stroke-width", 2)
          .attr("opacity", 0)
          .transition()
          .duration(300)
          .attr("opacity", 0.5);
      }
    });

    // Draw nodes with data binding for smooth updates
    const nodeSelection = mainGroupMerge
      .selectAll<SVGGElement, VisibleNode>(".religion-node")
      .data(visibleNodes, (d) => d.religion.id);

    // Remove exiting nodes
    nodeSelection.exit()
      .transition()
      .duration(300)
      .style("opacity", 0)
      .remove();

    // Add new nodes
    const nodeEnter = nodeSelection
      .enter()
      .append("g")
      .attr("class", "religion-node")
      .style("cursor", "pointer")
      .style("opacity", 0)
      .attr("transform", (d) => {
        const pos = nodePositions.get(d.religion.id);
        return `translate(${pos?.x || 0}, ${pos?.y || 0})`;
      });

    // Node circle
    nodeEnter
      .append("circle")
      .attr("class", "node-circle")
      .attr("r", (d) => sizeScale(d.religion.adherents || 10))
      .attr("fill", (d) => d.religion.color)
      .attr("stroke", "transparent")
      .attr("stroke-width", 3)
      .attr("opacity", 0.9);

    // Expand/collapse indicator
    nodeEnter
      .append("circle")
      .attr("class", "expand-indicator")
      .attr("r", 10)
      .attr("cx", (d) => -(sizeScale(d.religion.adherents || 10) + 5))
      .attr("fill", "#334155")
      .attr("stroke", "#475569")
      .attr("stroke-width", 1)
      .style("display", (d) => (d.hasChildren ? "block" : "none"));

    nodeEnter
      .append("text")
      .attr("class", "expand-text")
      .attr("x", (d) => -(sizeScale(d.religion.adherents || 10) + 5))
      .attr("y", 4)
      .attr("text-anchor", "middle")
      .style("fill", "#e2e8f0")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("pointer-events", "none")
      .style("display", (d) => (d.hasChildren ? "block" : "none"))
      .text((d) => (d.isExpanded ? "−" : "+"));

    // Node label
    nodeEnter
      .append("text")
      .attr("class", "node-label")
      .attr("x", (d) => sizeScale(d.religion.adherents || 10) + 8)
      .attr("y", 4)
      .style("fill", "#e2e8f0")
      .style("font-size", "13px")
      .style("font-weight", "500")
      .text((d) => d.religion.name);

    // Year label
    nodeEnter
      .append("text")
      .attr("class", "year-label")
      .attr("y", (d) => sizeScale(d.religion.adherents || 10) + 16)
      .attr("text-anchor", "middle")
      .style("fill", "#64748b")
      .style("font-size", "10px")
      .text((d) => {
        if (d.religion.foundedYear < 0) return `${Math.abs(d.religion.foundedYear)} BCE`;
        return `${d.religion.foundedYear} CE`;
      });

    // Merge enter and update selections
    const nodeUpdate = nodeEnter.merge(nodeSelection);

    // Animate to new positions
    nodeUpdate
      .transition()
      .duration(400)
      .style("opacity", 1)
      .attr("transform", (d) => {
        const pos = nodePositions.get(d.religion.id);
        return `translate(${pos?.x || 0}, ${pos?.y || 0})`;
      });

    // Update selection indicator
    nodeUpdate
      .select(".node-circle")
      .attr("stroke", (d) =>
        selectedReligion?.id === d.religion.id ? "#fff" : "transparent"
      );

    // Update expand/collapse text
    nodeUpdate
      .select(".expand-text")
      .text((d) => (d.isExpanded ? "−" : "+"));

    // Event handlers
    nodeUpdate
      .on("click", (event, d) => {
        event.stopPropagation();
        onSelectReligion(d.religion);
      })
      .on("dblclick", (event, d) => {
        event.stopPropagation();
        if (d.hasChildren) {
          toggleExpand(d.religion.id);
        }
      });

  }, [expandedNodes, getVisibleNodes, onSelectReligion, selectedReligion, toggleExpand]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        minHeight: "450px",
        background: "#0f172a",
        borderRadius: "12px",
        transition: "height 0.3s ease",
      }}
    />
  );
}
