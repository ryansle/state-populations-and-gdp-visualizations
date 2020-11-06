import React from "react";
import {
  Typography
} from "@material-ui/core";
import BarChart from "../charts/BarChart";

const Part1 = () => {
  return (
    <>
      <Typography variant="h2">Part 1 - Bar Charts</Typography>
      <BarChart width={1100} height={600} field="population" yRange={40000000} title="Population Graph"/>
    </>
  );
};

export default Part1;