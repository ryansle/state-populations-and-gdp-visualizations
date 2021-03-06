import React, { useEffect, useState } from "react";

// Components
import { Button, Typography } from "@material-ui/core";

// Utilities
import { makeStyles } from "@material-ui/core";
import * as d3 from "d3";
import dataset from "../assets/state_population_gdp.tsv";
import "./BarChart.css";

const BarChart = ({ width, height, field, yRange }) => {
  const classes = useStyles();
  const [alpha, setAlpha] = useState(true);
  const [ascend, setAscend] = useState(null);
  const [selected, setSelected] = useState("Alphabetical");

  const toggleAlpha = () => {
    setAlpha(true);
    setSelected("Alphabetical");
  };

  const handleAscend = () => {
    setAlpha(false);
    setAscend(true);
    setSelected("Ascending");
  }

  const handleDescend = () => {
    setAlpha(false);
    setAscend(false);
    setSelected("Descending");
  }

  useEffect(() => {
    drawGraph()
  });

  const drawGraph = () => {
    const margin = {top: 75, right: 75, bottom: 100, left: 75};

    const svg = d3.select("#chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)

    d3.tsv(dataset)
      .then(data => {
        data.forEach(d => {
          d.population = +d[field];
        });
        if (!alpha) {
          const c = ascend ? 1 : -1;
          const d = ascend ? -1 : 1;
          data.sort((a, b) => {
            if (a.population > b.population) {
              return c
            } else if (a.population < b.population) {
                return d;
            } else {
                return 0;
            }
          })
        }

        // Create the x-scale
        const x = d3.scaleBand()
          .domain(data.map(d => d.state))
          .range([margin.left, width - margin.right])
          .padding(0.2);

        // Draw the x-scale onto the graph
          svg.append("g")
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .selectAll("text")
              .attr("font-size", "10px")
              .style("text-anchor", "end")
              .attr("dx", "-10px")
              .attr("dy", "-5px")
              .attr("transform", "rotate(-50)");

          // Create the y-axis
          const y = d3.scaleLinear()
            .domain([0, yRange])
            .rangeRound([height - margin.bottom, margin.top]);

          // Draw the y-scale onto the graph
          svg.append("g")
            .call(d3.axisLeft(y))
            .attr("transform", `translate(${margin.left}, 0)`)
            .selectAll("text")
              .attr("font-size", "10px")
              .style("text-anchor", "end");

          // Draw the bars onto the graph based on the given dataset
          svg
            .selectAll("rect")
              .data(data)
              .enter()
              .append("rect")
                .attr("class", "barChartBar")
                .attr("x", data => x(data.state))
                .attr("y", data => y(data.population))
                .attr("height", data => height - y(data.population) - margin.bottom)
                .attr("width", x.bandwidth())
                .attr("transform", "translate(0, 0)")
                .attr("fill", "steelblue")
                .on("mouseenter", data => {
                    d3.select(`#label${data.target.__data__.state.split(" ").join("")}`).style('visibility', 'visible')
                })
                .on("mouseleave", data => {
                    d3.select(`#label${data.target.__data__.state.split(" ").join("")}`).style('visibility', 'hidden')
                })
                .append("title")
                .text(d => d.population);

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
    <div>
      <Button className={classes.btn} variant="contained" onClick={toggleAlpha}>Alphabetical</Button>
      <Button className={classes.btn} variant="contained" onClick={handleAscend}>Ascending</Button>
      <Button className={classes.btn} variant="contained" onClick={handleDescend}>Descending</Button>
      <br /> <br/>
      <Typography variant="h6">Current Setting: {selected} Order</Typography>
      {selected === "Alphabetical" && <div id="chart" />}
      {selected === "Ascending" && <div id="chart" />}
      {selected === "Descending" && <div id="chart" />}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "#282C34",
    color: "white",
    fontWeight: "bold",
    margin: "0px 10px 0px 10px",
  }
}));

export default BarChart;