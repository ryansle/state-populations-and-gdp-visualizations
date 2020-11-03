import React, { useRef, useEffect } from "react";

// Utilities
import * as d3 from "d3";

const BarChart = ({ width, height, dataset }) => {

  useEffect(() => {
    drawGraph();
  }, [dataset]);

  const drawGraph = () => { 
    const svg = d3.select("#chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("border", "1px solid black");

    // Create the x-sale
    const x = d3.scaleBand()
      .domain(dataset.map(data => data.state))
      .range([0, width])
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
  };

  return (
    <div id="chart"/>
  );
};

export default BarChart;