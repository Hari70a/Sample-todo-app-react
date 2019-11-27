import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addTodo, editTodo, removeTodo, completeTodo } from "../Actions/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import "../css/todo.css";
import "../css/todoform.css";

import classNames from "classnames";
import AlertDialog from "../Components/Shared/AlertDialog";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertOpen: false
    };
  }

  toggleAlertDialog = () => {
    this.setState({ isAlertOpen: !this.state.isAlertOpen });
  };

  render() {
    return (
      <div
        className={classNames("todo-container", "card")}
        style={{ flexDirection: "row" }}
      >
        <div className="checkbox-container">
          <Checkbox
            style={{
              padding: "0px",
              color: "#0a60b2"
            }}
            checked={this.props.item.isCompleted}
            value={this.props.item.title}
            color="primary"
            disableRipple
            onChange={() => this.props.completeTodo(this.props.item.id)}
          />

          <span
            className="todo-item"
            style={
              this.props.item.isCompleted
                ? {
                    textDecoration: "line-through"
                  }
                : null
            }
          >
            {this.props.item.title}
          </span>
        </div>

        {this.props.item.isCompleted === false && (
          <div className="row-container">
            <Link
              to={{
                pathname: "/edit",
                state: {
                  itemId: this.props.item.id
                }
              }}
              className={classNames("edit-btn", "center")}
            >
              <FontAwesomeIcon
                icon={"pen"}
                className={classNames("icon", "text-color")}
              />
              <span className="text-color">Edit</span>
            </Link>

            <button
              type="button"
              className={"delete-btn"}
              value="Delete"
              onClick={() => this.toggleAlertDialog()}
            >
              <FontAwesomeIcon
                icon={"trash"}
                className={classNames("icon", "text-color")}
              />
              Delete
            </button>
          </div>
        )}
        <AlertDialog
          open={this.state.isAlertOpen}
          handleClose={this.toggleAlertDialog}
          title="Want to delete the dask?"
          content={"Are you sure you want to delete this task?"}
          onPositive={() => this.props.removeTodo(this.props.item.id)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  editTodo: (todo, id) => dispatch(editTodo(id, todo)),
  removeTodo: id => dispatch(removeTodo(id)),
  completeTodo: id => dispatch(completeTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
