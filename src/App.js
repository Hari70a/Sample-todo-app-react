import React, { Component } from "react";
import "./App.css";
import Title from "./Components/Title";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

class App extends Component {
  render() {
    return (
      <div>
        <Title text={"Todos"} />
        <TodoList
          todos={this.props.todos}
          toggleChecked={this.props.toggleChecked}
          deleteItem={this.props.deleteItem}
          editItem={this.props.editItem}
          onChangeEdit={this.props.onChangeEdit}
        />
        <p>
          {this.props.getCompletedItems().length}
          {this.props.isSingular() ? " is completed" : " are completed"}
        </p>
      </div>
    );
  }
}

export default App;
