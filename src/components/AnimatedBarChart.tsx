import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface BarChartData {
  label: string;
  value: number;
  color: string;
  category?: string;
}

interface AnimatedBarChartProps {
  data: BarChartData[];
  title: string;
  subtitle?: string;
  height?: number;
  showValues?: boolean;
  horizontal?: boolean;
}

export default function AnimatedBarChart({ data, title, subtitle, height = 400, showValues = true, horizontal = false }: AnimatedBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const margin = { top: 20, right: 30, bottom: 60, left: horizontal ? 150 : 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    if (horizontal) {
      // Horizontal bar chart
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) || 0])
        .range([0, chartWidth]);

      const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartHeight])
        .padding(0.3);

      // Create tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "chart-tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "12px 16px")
        .style("border-radius", "8px")
        .style("box-shadow", "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", 1000)
        .style("font-size", "14px");

      // Add bars with hover
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d) => yScale(d.label) || 0)
        .attr("height", yScale.bandwidth())
        .attr("fill", (d) => d.color)
        .attr("rx", 6)
        .attr("width", 0)
        .style("cursor", "pointer")
        .on("mouseenter", function (event, d: any) {
          d3.select(this).transition().duration(200).attr("opacity", 0.8);

          tooltip
            .style("opacity", 1)
            .html(`<div><strong>${d.label}</strong><br/><span style="color: ${d.color}">●</span> ${d.value.toLocaleString()}</div>`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mousemove", function (event) {
          tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 28}px`);
        })
        .on("mouseleave", function () {
          d3.select(this).transition().duration(200).attr("opacity", 1);

          tooltip.style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .delay((_, i) => i * 50)
        .attr("width", (d) => xScale(d.value));

      // Add value labels
      if (showValues) {
        g.selectAll(".value-label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "value-label")
          .attr("x", (d) => xScale(d.value) + 10)
          .attr("y", (d) => (yScale(d.label) || 0) + yScale.bandwidth() / 2)
          .attr("dy", "0.35em")
          .attr("font-size", "14px")
          .attr("font-weight", "600")
          .attr("fill", "#374151")
          .style("opacity", 0)
          .text((d) => d.value.toLocaleString())
          .transition()
          .duration(500)
          .delay((_, i) => i * 100 + 800)
          .style("opacity", 1);
      }

      // Add y-axis
      g.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale)).selectAll("text").attr("font-size", "13px").attr("font-weight", "500").attr("fill", "#374151");

      // Add x-axis
      g.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${chartHeight})`).call(d3.axisBottom(xScale).ticks(5)).selectAll("text").attr("font-size", "12px").attr("fill", "#6b7280");
    } else {
      // Vertical bar chart
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartWidth])
        .padding(0.3);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) || 0])
        .range([chartHeight, 0]);

      // Create tooltip for vertical
      const tooltipVert = d3
        .select("body")
        .append("div")
        .attr("class", "chart-tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "12px 16px")
        .style("border-radius", "8px")
        .style("box-shadow", "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", 1000)
        .style("font-size", "14px");

      // Add bars with hover
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.label) || 0)
        .attr("width", xScale.bandwidth())
        .attr("fill", (d) => d.color)
        .attr("rx", 6)
        .attr("y", chartHeight)
        .attr("height", 0)
        .style("cursor", "pointer")
        .on("mouseenter", function (event, d: any) {
          d3.select(this).transition().duration(200).attr("opacity", 0.8);

          tooltipVert
            .style("opacity", 1)
            .html(`<div><strong>${d.label}</strong><br/><span style="color: ${d.color}">●</span> ${d.value.toLocaleString()}</div>`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mousemove", function (event) {
          tooltipVert.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 28}px`);
        })
        .on("mouseleave", function () {
          d3.select(this).transition().duration(200).attr("opacity", 1);

          tooltipVert.style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .delay((_, i) => i * 50)
        .attr("y", (d) => yScale(d.value))
        .attr("height", (d) => chartHeight - yScale(d.value));

      // Add value labels
      if (showValues) {
        g.selectAll(".value-label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "value-label")
          .attr("x", (d) => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
          .attr("y", (d) => yScale(d.value) - 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .attr("font-weight", "600")
          .attr("fill", "#374151")
          .style("opacity", 0)
          .text((d) => d.value.toLocaleString())
          .transition()
          .duration(500)
          .delay((_, i) => i * 100 + 800)
          .style("opacity", 1);
      }

      // Add x-axis
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("font-size", "12px")
        .attr("fill", "#374151")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      // Add y-axis
      g.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale).ticks(5)).selectAll("text").attr("font-size", "12px").attr("fill", "#6b7280");
    }

    // Style axis lines
    svg.selectAll(".domain, .tick line").attr("stroke", "#d1d5db").attr("stroke-width", 1);
  }, [data, height, horizontal, showValues]);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary-700 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      <div ref={containerRef} className="w-full">
        <svg ref={svgRef} width="100%" height={height}></svg>
      </div>
    </motion.div>
  );
}
