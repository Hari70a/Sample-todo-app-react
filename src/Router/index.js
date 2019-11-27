import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../App";
import TodoForm from "../Components/TodoForm";
import "../css/router.css";
import classNames from "classnames";

class Navigator extends Component {
  render() {
    return (
      <Router>
        <div className="nav-bar">
          <Link to="/" className={classNames("nav-link", "nav-item")}>
            Home
          </Link>
          <Link
            to="/add"
            className={classNames("nav-link", "nav-item", "nav-item-border")}
          >
            Add an item
          </Link>
        </div>
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route
          exact
          path="/add"
          render={props => <TodoForm formId="add" {...props} />}
        />
        <Route
          path="/edit"
          render={props => <TodoForm formId="edit" {...props} />}
        />
      </Router>
    );
  }
}

export default Navigator;
