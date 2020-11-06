import React, { useEffect } from "react";
import "./BarChart.css"
// Utilities
import * as d3 from "d3";
import dataset from "../assets/state_population_gdp.tsv";

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            field: this.props.field,
            yRange: this.props.yRange,
            alphabetical: true,
            ascending: true
        }
    }


    componentDidMount() {
        this.drawGraph();
    }

    drawGraph = () => {
        const margin = {top: 75, right: 75, bottom: 75, left: 75};
        const { width, height } = this.state;
        const svg = d3.select("#chart")
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .style("border", "1px solid black")

        d3.tsv(dataset)
            .then(data => {
                data.forEach(d => {
                    d.population = +d[this.props.field];
                });
                if(!this.state.alphabetical) {
                    const c = this.state.ascending ? 1 : -1;
                    const d = this.state.ascending ? -1 : 1;
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
                    .domain([0, this.state.yRange])
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
                    .text(d => d.population);
            })
    };

    render() {
        document.querySelector("#chart").innerHTML = "";
        this.drawGraph();
        return (
            <div>
                <button onClick={() => this.setState({ alphabetical: true })}>Alphabetical</button>
                <button onClick={() => this.setState({ alphabetical: false, ascending: true })}>Ascending</button>
                <button onClick={() => this.setState({ alphabetical: false, ascending: false })}>Descending</button>
                <div id="chart" />
            </div>

        )
    }
}

export default BarChart;