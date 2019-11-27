import React, { Component } from "react";
import "./App.css";
import Title from "./Components/Title";
import TodoList from "./Components/TodoList";
import Counter from "./Components/Counter";

import { connect } from "react-redux";
import "../src/css/todo.css";
import "../src/css/todoform.css";
import { toggleFilter } from "./Actions";
import { makeGetVisibleTodos } from "./Selectors";

class Home extends Component {
  state = {
    count: 0
  };
  completedItemsCount = () =>
    this.props.todos.filter(cur => cur.isCompleted).length;

  sortList = () => {
    const todos = [...this.props.todos];
    return todos
      .filter(cur => !cur.isCompleted)
      .concat(todos.filter(cur => cur.isCompleted));
  };

  render() {
    return (
      <div
        className={"center"}
        style={{
          flexDirection: "column"
        }}
      >
        <button onClick={() => this.props.toggleFilter("SHOW_ALL")}>
          show all
        </button>
        <button onClick={() => this.props.toggleFilter("SHOW_COMPLETED")}>
          show completed
        </button>
        <button onClick={() => this.props.toggleFilter("SHOW_ACTIVE")}>
          show active
        </button>
        <div style={{ flexDirection: "row" }}>
          <Title text={"Todos"} />
          <TodoList todos={this.sortList()} />
          {/* <Counter name={name}>
            <div>
              <p>Hello {name}</p>
              <button>Click</button>
            </div>
          </Counter> */}
        </div>

        <p>
          {this.completedItemsCount()}
          {this.completedItemsCount() === 1
            ? " is completed"
            : " are completed"}
        </p>
        <p>Completed todos</p>
        <ul>
          {this.props.toggledList.length > 0 &&
            this.props.toggledList.map((cur, idx) => {
              return <li key={idx.toString()}>{cur.title}</li>;
            })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    todos: state.todos,
    toggledList: makeGetVisibleTodos(state, props)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFilter: filter => {
      dispatch(toggleFilter(filter));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
