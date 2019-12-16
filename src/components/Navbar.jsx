import React, { Component } from "react";
import Navitem from "./Navitem";
import "./Navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-dark navbar-expand-lg bg-primary">
        <a class="navbar-brand" href="#">
          Pathfinding Visualizer
        </a>
        <ul class="navbar-nav">
          <Navitem />
          <Navitem />
          <Navitem />
        </ul>
      </nav>
    );
  }
}

export default Navbar;
