import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Religion } from "../data/religions";
import { religions, buildReligionTree } from "../data/religions";

interface TimelineProps {
  onSelectReligion: (religion: Religion) => void;
  selectedReligion: Religion | null;
}

interface TreeNode {
  religion: Religion;
  children: TreeNode[];
  x?: number;
  y?: number;
}

export function Timeline({ onSelectReligion, selectedReligion }: TimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };

    // Build tree structure
    const childrenMap = buildReligionTree(religions);

    function buildTree(parentId: string | null): TreeNode[] {
      const children = childrenMap.get(parentId || "root") || [];
      return children.map((religion) => ({
        religion,
        children: buildTree(religion.id),
      }));
    }

    const rootNodes = buildTree(null);

    // Time scale - from 2000 BCE to 2000 CE
    const timeScale = d3
      .scaleLinear()
      .domain([-2000, 2000])
      .range([margin.left, width - margin.right]);

    // Calculate positions using a simple tree layout
    const nodePositions: Map<string, { x: number; y: number }> = new Map();
    let yOffset = margin.top + 60;
    const ySpacing = 70;

    function layoutTree(nodes: TreeNode[], depth: number = 0) {
      nodes.forEach((node) => {
        const x = timeScale(node.religion.foundedYear);
        const y = yOffset;
        nodePositions.set(node.religion.id, { x, y });
        yOffset += ySpacing;

        if (node.children.length > 0) {
          layoutTree(node.children, depth + 1);
        }
      });
    }

    layoutTree(rootNodes);

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

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#94a3b8")
      .style("font-size", "12px");

    svg.selectAll(".x-axis path, .x-axis line").style("stroke", "#475569");

    // Draw time grid lines
    const gridLines = [-2000, -1500, -1000, -500, 0, 500, 1000, 1500, 2000];
    svg
      .selectAll(".grid-line")
      .data(gridLines)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", (d) => timeScale(d))
      .attr("x2", (d) => timeScale(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#1e293b")
      .attr("stroke-dasharray", "4,4");

    // Draw connections (curved lines from parent to child)
    religions.forEach((religion) => {
      if (religion.parentId) {
        const parentPos = nodePositions.get(religion.parentId);
        const childPos = nodePositions.get(religion.id);

        if (parentPos && childPos) {
          const path = d3.path();
          path.moveTo(parentPos.x, parentPos.y);

          // Create a curved path
          const midX = (parentPos.x + childPos.x) / 2;
          path.bezierCurveTo(
            midX,
            parentPos.y,
            midX,
            childPos.y,
            childPos.x,
            childPos.y
          );

          svg
            .append("path")
            .attr("d", path.toString())
            .attr("fill", "none")
            .attr("stroke", religion.color)
            .attr("stroke-width", 2)
            .attr("opacity", 0.5);
        }
      }
    });

    // Draw religion nodes
    const nodeGroups = svg
      .selectAll(".religion-node")
      .data(religions)
      .enter()
      .append("g")
      .attr("class", "religion-node")
      .attr("transform", (d) => {
        const pos = nodePositions.get(d.id);
        return `translate(${pos?.x || 0}, ${pos?.y || 0})`;
      })
      .style("cursor", "pointer")
      .on("click", (_, d) => onSelectReligion(d));

    // Node circles - size based on adherents (log scale)
    const sizeScale = d3
      .scaleSqrt()
      .domain([0, 2000])
      .range([8, 35]);

    nodeGroups
      .append("circle")
      .attr("r", (d) => sizeScale(d.adherents || 10))
      .attr("fill", (d) => d.color)
      .attr("stroke", (d) =>
        selectedReligion?.id === d.id ? "#fff" : "transparent"
      )
      .attr("stroke-width", 3)
      .attr("opacity", 0.9);

    // Node labels
    nodeGroups
      .append("text")
      .attr("x", (d) => sizeScale(d.adherents || 10) + 8)
      .attr("y", 4)
      .text((d) => d.name)
      .style("fill", "#e2e8f0")
      .style("font-size", "13px")
      .style("font-weight", "500");

    // Year labels under nodes
    nodeGroups
      .append("text")
      .attr("y", (d) => sizeScale(d.adherents || 10) + 16)
      .attr("text-anchor", "middle")
      .text((d) => {
        if (d.foundedYear < 0) return `${Math.abs(d.foundedYear)} BCE`;
        return `${d.foundedYear} CE`;
      })
      .style("fill", "#64748b")
      .style("font-size", "10px");

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 24)
      .attr("text-anchor", "middle")
      .text("Abrahamic Religions Timeline")
      .style("fill", "#f1f5f9")
      .style("font-size", "18px")
      .style("font-weight", "600");

    // Legend for size
    svg
      .append("text")
      .attr("x", width - margin.right - 10)
      .attr("y", margin.top + 10)
      .attr("text-anchor", "end")
      .text("Circle size = adherents (millions)")
      .style("fill", "#64748b")
      .style("font-size", "11px");
  }, [onSelectReligion, selectedReligion]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: "450px",
        background: "#0f172a",
        borderRadius: "12px",
      }}
    />
  );
}
