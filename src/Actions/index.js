import {
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  REORDER_TODOS,
  TOGGLE_FILTER
} from "./ActionTypes";

export const addTodo = todo => {
  return {
    type: ADD_TODO,
    todo
  };
};

export const removeTodo = id => {
  return {
    type: REMOVE_TODO,
    id
  };
};

export const editTodo = (id, title) => {
  return {
    type: EDIT_TODO,
    id,
    title
  };
};

export const completeTodo = id => {
  console.log(id, "completeTodo$$$$$####");
  return {
    type: COMPLETE_TODO,
    id
  };
};

export const reorderTodos = todos => {
  return {
    type: REORDER_TODOS,
    todos
  };
};

export const toggleFilter = filter => {
  return {
    type: TOGGLE_FILTER,
    filter
  };
};
