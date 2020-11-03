import React, { useEffect, useState} from "react";

// Components
import { 
  Typography
} from "@material-ui/core";
import BarChart from "../charts/BarChart";

// Utilities
import * as d3 from "d3";

// Assets
import dataset from "../assets/state_population_gdp.tsv";

const Part1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.tsv(dataset)
      .then((d) => {
        setData(d);
        setLoading(false);
      });
      return () => undefined;
  }, []);

  return (
    <>
      <Typography variant="h2">Part 1 - Bar Charts</Typography>
      {loading && <Typography variant="h6">Loading...</Typography>}
      {!loading && 
        <BarChart width={1100} height={600} dataset={data} />}
    </>
  );
};

export default Part1;