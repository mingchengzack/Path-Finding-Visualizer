import React, { Component } from "react";

class Navitem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name };
  }

  render() {
    return (
      <li className="nav-item active">
        <a className="nav-link" href="#">
          {this.state.name}
        </a>
      </li>
    );
  }
}

export default Navitem;
