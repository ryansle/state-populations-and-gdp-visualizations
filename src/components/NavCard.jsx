import React from "react";

// Components
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

// Utilities
import { makeStyles } from "@material-ui/core/styles";

const NavCard = ({ title, description, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <a className={classes.route} href={link}>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Typography className={classes.black} variant="h6">
              {title} 
            </Typography>
            <ChevronRight className={classes.black} />
          </Grid>
          <Typography variant="body2" color="textSecondary">
            {description} 
          </Typography>
        </CardContent>
      </a>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    textAlign: "left",
    margin: "0px 20px 30px 20px",
    width: "20%",
    "&:hover": {
      boxShadow: "0 4px 8px 1px rgba(0, 0, 0, 0.2), 0 6px 20px 1px rgba(0, 0, 0, 0.19)",
    },
  },
  
  route: {
    textDecoration: "none",
  },
  black: {
    color: "black"
  }
}));

export default NavCard;