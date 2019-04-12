import React, { Component } from "react";
import "./App.css";
import Title from "./Components/Title";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import update from "immutability-helper";
import shortid from "shortid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: "",
      completedItems: [],
      todos: [
        {
          id: shortid.generate(),
          title: "Learn Js",
          isCompleted: false,
          isEditing: false
        },
        {
          id: shortid.generate(),
          title: "Learn HTML",
          isCompleted: false,
          isEditing: false
        },
        {
          id: shortid.generate(),
          title: "Learn React",
          isCompleted: false,
          isEditing: false
        }
      ]
    };
  }

  onChange = e => {
    this.setState({ todoInput: e.target.value });
  };

  onSubmit = () => {
    const updatedTodos = update(this.state.todos, {
      $push: [
        {
          id: shortid.generate(),
          title: this.state.todoInput,
          isCompleted: false
        }
      ]
    });

    this.setState({
      todoInput: "",
      todos: updatedTodos
    });
  };

  toggleChecked = item => {
    const itemPos = this.state.todos.findIndex(cur => cur.id === item.id);
    const updatedTodos = update(this.state.todos, {
      [itemPos]: {
        isCompleted: { $set: !this.state.todos[itemPos].isCompleted }
      }
    });
    this.setState({ todos: updatedTodos });
  };

  getCompletedItems = () => {
    return this.state.todos.filter(cur => cur.isCompleted === true);
  };

  editItem = item => {
    const itemPos = this.state.todos.findIndex(cur => cur.id === item.id);
    const updatedTodos = update(this.state.todos, {
      [itemPos]: {
        isEditing: { $set: !this.state.todos[itemPos].isEditing }
      }
    });
    this.setState({ todos: updatedTodos });
  };

  isSingular = () => this.getCompletedItems().length === 1;

  deleteItem = item => {
    const itemPos = this.state.todos.findIndex(cur => cur.id === item.id);
    const updatedTodos = update(this.state.todos, {
      $splice: [[itemPos, 1]]
    });
    this.setState({ todos: updatedTodos });
  };

  onChangeEdit = (e, item) => {
    const itemPos = this.state.todos.findIndex(cur => cur.id === item.id);
    const updatedTodos = update(this.state.todos, {
      [itemPos]: {
        title: { $set: e.target.value }
      }
    });
    this.setState({ todos: updatedTodos });
  };

  render() {
    return (
      <div>
        <Title text={"Todos"} />
        <TodoForm
          onChange={this.onChange}
          onClick={this.onSubmit}
          value={this.props.todoInput}
          btnText={"Add todo"}
        />
        <TodoList
          todos={this.state.todos}
          toggleChecked={this.toggleChecked}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
          onChangeEdit={this.onChangeEdit}
        />
        <p>
          {this.getCompletedItems().length}
          {this.isSingular() ? " is completed" : " are completed"}
        </p>
      </div>
    );
  }
}

export default App;
