import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface AreaChartData {
  label: string;
  value: number;
}

interface AnimatedAreaChartProps {
  data: AreaChartData[];
  title: string;
  subtitle?: string;
  height?: number;
  color?: string;
}

export default function AnimatedAreaChart({ data, title, subtitle, height = 400, color = "#00718f" }: AnimatedAreaChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const margin = { top: 20, right: 30, bottom: 80, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([chartHeight, 0])
      .nice();

    // Create area generator
    const area = d3
      .area<AreaChartData>()
      .x((_, i) => xScale(i))
      .y0(chartHeight)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Create line generator
    const line = d3
      .line<AreaChartData>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg.append("defs").append("linearGradient").attr("id", "area-gradient").attr("x1", "0%").attr("x2", "0%").attr("y1", "0%").attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 0.8);

    gradient.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0.1);

    // Add area path with animation
    const areaPath = g.append("path").datum(data).attr("fill", "url(#area-gradient)").attr("d", area);

    areaPath.attr("opacity", 0).transition().duration(1500).attr("opacity", 1);

    // Add line path with animation
    const linePath = g.append("path").datum(data).attr("fill", "none").attr("stroke", color).attr("stroke-width", 3).attr("d", line);

    const lineLength = linePath.node()?.getTotalLength() || 0;

    linePath.attr("stroke-dasharray", `${lineLength} ${lineLength}`).attr("stroke-dashoffset", lineLength).transition().duration(2000).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    // Add dots with staggered animation
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (_, i) => xScale(i))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 0)
      .attr("fill", color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(500)
      .delay((_, i) => 1500 + i * 50)
      .attr("r", 5);

    // Add crosshair
    const crosshairGroup = g.append("g").attr("class", "crosshair").style("opacity", 0);

    const verticalLine = crosshairGroup.append("line").attr("y1", 0).attr("y2", chartHeight).attr("stroke", "#9ca3af").attr("stroke-width", 1).attr("stroke-dasharray", "4,4");

    const horizontalLine = crosshairGroup.append("line").attr("x1", 0).attr("x2", chartWidth).attr("stroke", "#9ca3af").attr("stroke-width", 1).attr("stroke-dasharray", "4,4");

    // Add hover interactivity
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "12px 16px")
      .style("border-radius", "8px")
      .style("box-shadow", "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000)
      .style("font-size", "14px");

    g.selectAll(".dot")
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d: any) {
        d3.select(this).transition().duration(200).attr("r", 8).attr("stroke-width", 3);

        const [x, y] = [xScale(data.indexOf(d)), yScale(d.value)];

        crosshairGroup.style("opacity", 1);
        verticalLine.attr("x1", x).attr("x2", x);
        horizontalLine.attr("y1", y).attr("y2", y);

        tooltip
          .style("opacity", 1)
          .html(`<div><strong>${d.label}</strong><br/><span style="color: ${color}">●</span> ${d.value.toLocaleString()}</div>`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseleave", function () {
        d3.select(this).transition().duration(200).attr("r", 5).attr("stroke-width", 2);

        crosshairGroup.style("opacity", 0);
        tooltip.style("opacity", 0);
      });

    // Add x-axis
    const xAxis = g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(d3.range(0, data.length, Math.ceil(data.length / 8)))
          .tickFormat((i) => data[i as number]?.label || "")
      );

    xAxis.selectAll("text").attr("font-size", "11px").attr("fill", "#374151").attr("transform", "rotate(-45)").style("text-anchor", "end");

    // Add y-axis
    g.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale).ticks(6)).selectAll("text").attr("font-size", "12px").attr("fill", "#6b7280");

    // Style axis lines
    svg.selectAll(".domain, .tick line").attr("stroke", "#d1d5db").attr("stroke-width", 1);

    // Cleanup
    return () => {
      tooltip.remove();
    };
  }, [data, height, color]);

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
