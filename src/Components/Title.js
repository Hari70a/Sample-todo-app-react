import React, { Component } from "react";

export default class Title extends Component {
  render() {
    return <p style={{ color: "red" }}>{this.props.text}</p>;
  }
}
