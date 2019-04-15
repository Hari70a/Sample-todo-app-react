import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../App";
import TodoForm from "../Components/TodoForm";
import update from "immutability-helper";
import shortid from "shortid";

class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: "",
      completedItems: [],
      itemPosition: 0,
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
    this.setState({ todos: updatedTodos, itemPosition: itemPos });
  };

  isSingular = () => this.getCompletedItems().length === 1;

  deleteItem = item => {
    const itemPos = this.state.todos.findIndex(cur => cur.id === item.id);
    const updatedTodos = update(this.state.todos, {
      $splice: [[itemPos, 1]]
    });
    this.setState({ todos: updatedTodos });
  };

  onChangeEdit = e => {
    const itemPos = this.state.todos.findIndex(
      cur => cur.id === this.state.todos[this.state.itemPosition].id
    );
    const updatedTodos = update(this.state.todos, {
      [itemPos]: {
        title: { $set: e.target.value }
      }
    });
    this.setState({ todos: updatedTodos });
  };

  render() {
    return (
      <Router>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li
            style={{
              flex: 0.5
            }}
          >
            <Link to="/">Home</Link>
          </li>
          <li style={{ flex: 0.5 }}>
            <Link to="/add">Add an item</Link>
          </li>
        </ul>
        <hr />
        <Route
          exact
          path="/"
          render={() => (
            <Home
              todos={this.state.todos}
              toggleChecked={this.toggleChecked}
              deleteItem={this.deleteItem}
              editItem={this.editItem}
              onChangeEdit={this.onChangeEdit}
              getCompletedItems={this.getCompletedItems}
              isSingular={this.isSingular}
            />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <TodoForm
              onChange={this.onChange}
              onClick={this.onSubmit}
              value={this.state.todoInput}
              btnText={"Add todo"}
              {...props}
            />
          )}
        />
        <Route
          path="/edit"
          render={props => (
            <TodoForm
              onChange={this.onChangeEdit}
              onClick={this.editItem}
              value={this.state.todos[this.state.itemPosition].title}
              btnText={"Edit todo"}
              item={this.state.todos[this.state.itemPosition]}
              {...props}
            />
          )}
        />
      </Router>
    );
  }
}

export default Navigator;
