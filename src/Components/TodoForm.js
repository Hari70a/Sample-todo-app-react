import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/todo.css";
import "../css/todoform.css";
import { addTodo, editTodo, removeTodo, completeTodo } from "../Actions/";

import Title from "../Components/Title";
import Input from "@material-ui/core/Input";
import classNames from "classnames";
import AlertDialog from "../Components/Shared/AlertDialog";
import CustomSnackWrapper from "./Shared/CustomSnackWrapper";
import Snackbar from "@material-ui/core/Snackbar";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.itemPos =
      this.props.location.state &&
      this.props.todos.findIndex(
        cur => cur.id === this.props.location.state.itemId
      );
    this.state = {
      input:
        this.props.formId === "add" ? "" : this.props.todos[this.itemPos].title,
      isAlertOpen: false,
      isSnackOpen: false
    };
  }

  submitTodo = () => {
    this.props.formId === "add"
      ? this.props.addTodo(this.state.input)
      : this.props.editTodo(this.props.location.state.itemId, this.state.input);
    this.setState({ input: "", isSnackOpen: true });

    // this.props.history.push("/");
    this.setState({ isSnackOpen: true });
  };

  toggleAlertDialog = () => {
    this.setState({ isAlertOpen: !this.state.isAlertOpen });
  };

  isTodoPresent = () => this.state.input;

  handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ isSnackOpen: !this.state.isSnackOpen });
  };

  render() {
    return (
      <div className={classNames("form-container", "center")}>
        <div className={classNames("card", "metrices")}>
          <Title text={"Mind your task here"} />
          <div className="card-container">
            <div style={{ flex: 0.7, marginTop: "10px" }}>
              <Input
                style={{ margin: "10px 8px", width: "97%" }}
                type="text"
                placeholder="Todo"
                required
                value={this.state.input}
                onChange={e => this.setState({ input: e.target.value })}
              />
            </div>
            <div className={"center"} style={{ flex: 0.3 }}>
              <button
                className="add-btn"
                onClick={() => {
                  this.isTodoPresent()
                    ? this.submitTodo()
                    : this.toggleAlertDialog();
                }}
              >
                {`${this.props.formId
                  .substring(0, 1)
                  .toUpperCase()}${this.props.formId.substring(1)} Todo`}
              </button>
            </div>
          </div>
          <AlertDialog
            open={this.state.isAlertOpen}
            handleClose={this.toggleAlertDialog}
            title="Add your task?"
            content={"Please add your tasks here and get things done."}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={this.state.isSnackOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
          >
            <CustomSnackWrapper
              onClose={this.handleSnackClose}
              variant="success"
              message={`Task ${this.props.formId}ed successfully!`}
            />
          </Snackbar>

          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  editTodo: (id, title) => dispatch(editTodo(id, title)),
  removeTodo: id => dispatch(removeTodo(id)),
  completeTodo: id => dispatch(completeTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
