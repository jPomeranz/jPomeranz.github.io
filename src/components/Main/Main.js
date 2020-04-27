import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Contact from "../Contact/Contact";

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </main>
  );
}

export default Main;
