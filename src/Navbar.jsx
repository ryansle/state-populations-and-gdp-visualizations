import React from "react";

// Components
import { 
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

// Assets
import unl from "./assets/unl.svg";

// Utilities
import { makeStyles } from "@material-ui/core/styles";

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.nav} position="static">
      <Toolbar>
        <img className={classes.icon} src={unl} alt="University of Nebraska-Lincoln" />
        <Typography variant="h6">Data Modeling Assignment 4</Typography>
        <div className={classes.grow} />
        <Button 
          className={classes.button} 
          size="large"
          component={Link} 
          to="/"
        >
          Home
        </Button>
        <Button 
          className={classes.button} 
          size="large"
          component={Link} 
          to="/part1"
        >
          Part 1
        </Button>
        <Button 
          className={classes.button} 
          size="large"
          component={Link} 
          to="/part2"
        >
          Part 2
        </Button>
        <Button 
          className={classes.button} 
          size="large"
          component={Link} 
          to="/part3"
        >
          Part 3
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() => ({
  icon: {
    height: 45,
    width: "auto",
    padding: "10px 20px 10px 0px",
  },
  nav: {
    margin: "0px 0px 50px 0px",
    backgroundColor: "#282c34",

  },
  button: {
    color: "white",
  },
  grow: { 
    flexGrow: 1,
  }
}));

export default Navbar;