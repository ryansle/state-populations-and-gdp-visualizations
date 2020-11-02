import React from "react";

// Sections
import Home from "./Home";
import Part1 from "./partB_1/Part1";
import Part2 from "./partB_2/Part2";
import Part3 from "./partB_3/Part3";

// Utilities
import { Switch, Route } from "react-router-dom";

const Router = () => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={Home}
      />
      <Route
        path="/part1"
        exact
        component={Part1}
      />
      <Route
        path="/part2"
        exact
        component={Part2}
      />
      <Route
        path="/part3"
        exact
        component={Part3}
      />
    </Switch>
  );
};

export default Router;