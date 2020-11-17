import React from "react";

// Components
import { 
  Typography,
  Grid
} from "@material-ui/core";
import NavCard from "./components/NavCard";

// Utilities
import { makeStyles } from "@material-ui/core/styles";

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2">Ryan Le, Christian Berck, Easton Joachimsen</Typography>
      <br /> <br />
      <Grid container justify="center">
        <NavCard 
          title="View Full Report"
          description="View our detailed report on the entirety of Assignment 4, from Apriori algorithms to d3 visualizations, and everything in between."
          link="https://docs.google.com/document/d/1sWFVsZqSb9eR0e0t-FpfBINrUsnArrtvMI_D9JzIiJM/edit"
        />
        <NavCard 
          title="View Google Colab Repository"
          description="View our feature-complete code for the Apriori algorithm, and the brute-force algorithm for the frequent 3-itemsets generation problem."
          link="https://colab.research.google.com/drive/1-CBfqTB8J0oN2bBRutN6va6JylTgrRx5?usp=sharing"
        />
        <br /> <br />
      </Grid>
      <Typography variant="body1" color="textSecondary" gutterBottom>...or read about Part B of the assignment below!</Typography>
      <br />
      <Typography className={classes.report} paragraph>
        This web app allows you to visualize the data present on the 
        provided <code>state_population_gdp.tsv</code> file using the d3 library. In Part B1,
        we display a bar chart representing each state's population and allow
        a user to hover over each bar to both change the color (to represent mouseover), 
        and view the detailed population number of a chosen state. Rather than provide
        a screenshot of this display, we ask that you navigate to the "Part 1" page above to see.
      </Typography>
      <br /> <br />
      <Typography className={classes.report} paragraph>
        We also allow a user to filter the data in terms of displaying it 
        alphabetically (default), in ascending order by field, and by descending order.
        This should qualify our team for <b>10 extra credit points.</b>
      </Typography>
      <br /> <br />
      <Typography className={classes.report} paragraph>
        Last but not least, along with Bar Charts, our team created a visual display
        for scatterplotting the data, also using the d3 library. Hovering over the individually
        drawn circles of the plot allows you see derived numbers based on state name and per-capita
        GDP. We also display the axes in order to make the visualization more meaningful, as per
        the assignment requirements.
      </Typography>
      <br /> <br />
      <Typography variant="h4">Other Links</Typography>
      <br /> <br />
      <Grid container justify="center">
        <NavCard
          title="Assignment Handout"
          description="The original specification for the assignment."
          link="https://unl.app.box.com/s/y4fh4rcd8qfubjp05g6yf1i10vyob95p"
        />
        <NavCard
          title="Provided Dataset"
          description="The provided dataset for both Apriori and d3 visualizations."
          link="https://unl.app.box.com/s/dug7yupryqpwlhreduq87nsm4dk8bm6p"
        />
        <NavCard
          title="D3 Documenatation"
          description="Useful resources that our team used to figure out how to use D3."
          link="https://github.com/d3/d3/wiki"
        />
      </Grid>
    </>
  );
};

const useStyles = makeStyles(() => ({
  report: {
    margin: "0px 25% 0px 25%"
  }
}));

export default Home;