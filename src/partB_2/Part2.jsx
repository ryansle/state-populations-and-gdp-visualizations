import React from "react";

// Components
import { 
  Typography
} from "@material-ui/core";
import BarChart from "../charts/BarChart";

// Utilities

const Part2 = () => {
  return (
    <>
      <Typography variant="h2">Part 2 - GDP Numbers</Typography>
        <BarChart width={1100} height={600} field="gdp" yRange={2000000} title="GDP Graph"/>
    </>
  );
};

export default Part2;