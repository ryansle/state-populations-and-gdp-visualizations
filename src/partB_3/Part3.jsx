import React from "react";

// Components
import { 
  Typography
} from "@material-ui/core";
import ScatterPlot from "../charts/ScatterPlot";

const Part3 = () => {
  return (
    <>
      <Typography variant="h2">Part 3 - Scatter Plots</Typography>
      <ScatterPlot width={1100} height={600} />
    </>
  );
};

export default Part3;