import React, { useEffect } from "react";

// Utilities
import * as d3 from "d3";
import {event as currentEvent} from 'd3-selection';
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

        // const tooltip = d3.select("#chart").append("div")
        //   .attr("class", "tooltip")
        //   .style("opacity", 0);
        
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
              .on("mouseenter", data => {
                d3.select(`#label${data.target.__data__.state.split(" ").join("")}`).style('visibility', 'visible')
              })
              .on("mouseleave", data => {
                  d3.select(`#label${data.target.__data__.state.split(" ").join("")}`).style('visibility', 'hidden')
              })
              .append("title")
              .text(d => d.population);
              // .on('mouseover', function (data, i) {
              //   d3.select(this).transition()
              //     .duration('100')
              //     .attr("r", 7);
              //   tooltip.transition()
              //     .duration(100)
              //     .style("opacity", 1);
              //   tooltip.html("$" + d3.format(".2f")(data.state))      
              // })
              // .on('mouseout', function (d, i) {
              //     d3.select(this).transition()
              //       .duration('200')
              //       .attr("r", 5);
              //     tooltip.transition()
              //       .duration('200')
              //       .style("opacity", 0);
              // });
        
              svg
              .selectAll()
              .data(data)
                .enter()
                .append("text")
                .style("font-size", 15)
                .style("font-weight", 500)
                .style('visibility', 'hidden')
                .attr("id", data => `label${data.state.split(" ").join("")}`)
                .attr("fill", "black")
                .attr("x", data => x(data.state))
                .attr("y", data => y(data.population) - 3)
                .text(data => data.population);
      })
  };

  return (
    <div id="chart" />
  )
};

export default ScatterPlot;