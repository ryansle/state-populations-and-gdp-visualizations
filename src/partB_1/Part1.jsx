import React from "react";

// Components
import { 
  Typography
} from "@material-ui/core";
import BarChart from "../charts/BarChart";

const Part1 = () => {

  return (
    <>
      <Typography variant="h2">Part 1 - Bar Charts</Typography>
      <BarChart width={1100} height={600} />
    </>
  );
};

export default Part1;