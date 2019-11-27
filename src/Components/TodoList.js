import React, { Component } from "react";
import Todo from "./Todo";
import { reorderTodos } from "../Actions";

import { connect } from "react-redux";
import Sortable from "react-sortablejs";

class TodoList extends Component {
  render() {
    return (
      <Sortable
        // Sortable options (https://github.com/RubaXa/Sortable#options)
        options={{}}
        // [Optional] Use ref to get the sortable instance
        // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
        // ref={c => {
        //   if (c) {
        //     sortable = c.sortable;
        //   }
        // }}
        // [Optional] A tag or react component to specify the wrapping element. Defaults to "div".
        // In a case of a react component it is required to has children in the component
        // and pass it down.
        tag="div"
        // [Optional] The onChange method allows you to implement a controlled component and keep
        // DOM nodes untouched. You have to change state to re-render the component.
        // @param {Array} order An ordered array of items defined by the `data-id` attribute.
        // @param {Object} sortable The sortable instance.
        // @param {Event} evt The event object.
        style={{ marginTop: "10px", marginBottom: "10px" }}
        onChange={(order, sortable, evt) => {
          console.log(order, sortable, evt, "order");
          // this.props.reorderTodos(order);
        }}
      >
        {/* <div style={{ marginTop: "10px", marginBottom: "10px" }}> */}
        {this.props.todos.map(cur => {
          return <Todo key={cur.id} item={cur} {...this.props} />;
        })}
        {/* </div> */}
      </Sortable>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  reorderTodos: todo => dispatch(reorderTodos(todo))
  // editTodo: (todo, id) => dispatch(editTodo(id, todo)),
  // removeTodo: id => dispatch(removeTodo(id)),
  // completeTodo: id => dispatch(completeTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
