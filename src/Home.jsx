import React from "react";

// Components
import { 
  Typography
} from "@material-ui/core";

// Utilities
import { makeStyles } from "@material-ui/core/styles";

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2">Ryan Le, Christian Berck, Easton Joachimsen</Typography>
    </>
  );
};

const useStyles = makeStyles(() => ({

}));

export default Home;