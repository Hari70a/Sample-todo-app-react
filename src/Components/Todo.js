import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Todo extends Component {
  render() {
    if (this.props.item.isEditing) {
      return <Redirect to="/edit" />;
    }
    return (
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          name={this.props.item.title}
          checked={this.props.item.isCompleted}
          value={this.props.item.title}
          onChange={() => this.props.toggleChecked(this.props.item)}
        />
        {this.props.item.title}
        <span
          style={{ marginLeft: 15 }}
          onClick={() => this.props.editItem(this.props.item)}
        >
          Edit
        </span>
        <span
          style={{ marginLeft: 15 }}
          onClick={() => this.props.deleteItem(this.props.item)}
        >
          Delete
        </span>
      </div>
    );
  }
}
