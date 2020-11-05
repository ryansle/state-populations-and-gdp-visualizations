import React, { useEffect } from "react";

// Utilities
import * as d3 from "d3";
import dataset from "../assets/state_population_gdp.tsv";

const BarChart = ({ width, height }) => {
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

    d3.tsv(dataset)
      .then(data => {
        data.forEach(d => {
          d.population = +d.population;
        });

        // Create the x-scale
        const x = d3.scaleBand()
          .domain(data.map(d => d.state))
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

        // Create the y-axis
        const y = d3.scaleLinear()
          .domain([0, 39000000])
          .rangeRound([height - margin.bottom, margin.top]);

        // Draw the y-scale onto the graph
        svg.append("g")
          .call(d3.axisLeft(y))
          .selectAll("text")
            .attr("font-size", "10px")
            .style("text-anchor", "end")
            .attr("transform", `translate(${margin.left},0)`)

        // Draw the bars onto the graph based on the given dataset
        svg
          .selectAll()
            .data(data)
            .enter()
          .append("rect")
          .attr("x", data => x(data.state))
          .attr("y", data => y(data.population))
          .attr("height", data => height - y(data.population))
          .attr("width", x.bandwidth())
          .attr("fill", "steelblue")
      })
  };

  return (
    <div id="chart"/>
  );
};

export default BarChart;