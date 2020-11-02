import React from "react";

// Components
import { 
  Typography
} from "@material-ui/core";

// Utilities
import { makeStyles } from "@material-ui/core/styles";

const Part1 = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2">Part 1 - Bar Charts</Typography>
    </>
  );
};

const useStyles = makeStyles(() => ({

}));

export default Part1;