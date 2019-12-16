import React, { Component } from "react";
import Navitem from "./Navitem";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <a className="navbar-brand" href="#">
          Pathfinding Visualizer
        </a>
        <ul className="navbar-nav">
          <Navitem name={"Algorithms"} />
          <Navitem name={"Visualize"} />
          <Navitem name={"Clear Board"} />
        </ul>
      </nav>
    );
  }
}

export default Navbar;
