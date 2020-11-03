import React, { useEffect } from "react";

// Utilities
import * as d3 from "d3";

const BarChart = ({ width, height, dataset }) => {
  const margin = {top: 30, right: 75, bottom: 30, left: 75};

  // Don't modify this, it just calls the drawGraph function on startup
  useEffect(() => {
    drawGraph();
  });

  const drawGraph = () => { 
    const svg = d3.select("#chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("border", "1px solid black");

    // Create the x-scale
    const x = d3.scaleBand()
      .domain(dataset.map(data => data.state))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    // Draw the x-scale onto the graph
    svg.append("g")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("font-size", "10px")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "-5px")
        .attr("transform", "rotate(-80)")

    // Functional to this point
    const y = d3.scaleLinear()
      .domain([0, 39000000])
      .rangeRound([height - margin.bottom, margin.top]);

    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
        .attr("font-size", "10px")
        .style("text-anchor", "end")
        .attr("transform", `translate(${margin.left},0)`)
  };

  return (
    <div id="chart"/>
  );
};

export default BarChart;