import React, { useEffect } from "react";

// Utilities
import * as d3 from "d3";
import dataset from "../assets/state_population_gdp.tsv";

const ScatterPlot = ({ width, height }) => {
  const margin = {top: 30, right: 75, bottom: 30, left: 75};

  useEffect(() => {
    drawGraph();
  });

  const drawGraph = () => {
    const svg = d3.select("#chart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.tsv(dataset)
      .then(data => {
        data.forEach(d => {
          d.population = +d.population;
          d.gdp = +d.gdp;
        });

        // Create x-axis
        const x = d3.scaleLinear()
          .domain([0, 40000000])
          .range([0, width])

        // Append x-axis
        svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))

        // Create y-axis
        const y = d3.scaleLinear()
          .domain([0, 2000000])
          .range([height, 0])

        // Append y-axis
        svg.append("g")
          .call(d3.axisLeft(y))

        var tooltip = d3.select("#chart")
          .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Plot data
        svg.append("g")
          .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
              .attr("cx", data => x(data.population))
              .attr("cy", data => y(data.gdp))
              .attr("r", 5)
              .style("fill", "steelblue")
              .on('mouseover', function (d, i) {
                d3.select(this).transition()
                  .duration('100')
                  .attr("r", 7)
                  .style("fill", "red");
                tooltip.transition()
                  .duration(100)
                  .style("opacity", 1);
                tooltip.html(d3.format(".2f")(data.population))
                  .style("left", window.pageXOffset - 30 + "px")
                  .style("top", window.pageYOffset - 23 + "px");
                })
                .on('mouseout', function (d, i) {
                  d3.select(this).transition()
                    .duration('200')
                    .attr("r", 5)
                    .style("fill", "steelblue");
                  tooltip.transition()
                    .duration('200')
                    .style("opacity", 0);
                });
      })
  };

  return (
    <div id="chart" />
  )
};

export default ScatterPlot;