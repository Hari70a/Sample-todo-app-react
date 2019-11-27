import {
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  REORDER_TODOS,
  TOGGLE_FILTER
} from "../Actions/ActionTypes";
import shortid from "shortid";

const DEFAULT_STATE = {
  filter: "SHOW_ALL",
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

const reducer = (state = DEFAULT_STATE, action) => {
  console.log(action.type, "reducer5555");
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: shortid.generate(),
            title: action.todo,
            isCompleted: false
          }
        ]
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          return todo.id === action.id
            ? {
                ...todo,
                ...{
                  title: action.title
                }
              }
            : todo;
        })
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          return todo.id === action.id
            ? {
                ...todo,
                ...{
                  isCompleted: !todo.isCompleted
                }
              }
            : todo;
        })
      };
    case TOGGLE_FILTER:
      console.log(action, "Tooglle filter");
      return {
        ...state,
        filter: action.filter
      };
    // case REORDER_TODOS:
    //   console.log(action, "action#####");
    //   return {
    //     todos: [action.todos]
    //   };
    default:
      return state;
  }
};
export default reducer;
