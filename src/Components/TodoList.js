import React, { Component } from "react";
import Todo from "./Todo";

export default class TodoList extends Component {
  render() {
    return (
      <div>
        {this.props.todos.map(cur => {
          return (
            <Todo
              key={cur.id}
              item={cur}
              toggleChecked={this.props.toggleChecked}
              deleteItem={this.props.deleteItem}
              editItem={this.props.editItem}
              onChangeEdit={this.props.onChangeEdit}
            />
          );
        })}
      </div>
    );
  }
}
