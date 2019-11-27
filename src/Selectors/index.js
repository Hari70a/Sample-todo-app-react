//
import { createSelector } from "reselect";

const getVisibilityFilter = state => {
  console.log(state, "VB filter");
  return state.filter;
};
const getTodos = state => {
  console.log(state, "state");
  return state.todos;
};

export const makeGetVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_COMPLETED":
        return todos.filter(t => t.isCompleted);
      case "SHOW_ACTIVE":
        return todos.filter(t => !t.isCompleted);
    }
  }
);
