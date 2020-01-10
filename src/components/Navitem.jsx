import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";

class Navitem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name, type: props.type, curItem: props.curItem };
  }

  handleChangeItem = item => {
    this.setState({ curItem: item });
    this.props.onChangeItem(item);
  };

  render() {
    const { type } = this.state;
    if (type === "button") {
      return (
        <li>
          <Button id="button" onClick={() => this.props.onClick()}>
            {this.state.name}
          </Button>
        </li>
      );
    } else {
      return (
        <li>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-toggle">
              {this.state.name + " : " + this.state.curItem + "  "}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.props.itemList.map(item => {
                return (
                  <Dropdown.Item
                    key={item}
                    onSelect={() => this.handleChangeItem(item)}
                    id="dropdown-item"
                  >
                    {item}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );
    }
  }
}

export default Navitem;
