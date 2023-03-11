import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: JSON.parse(localStorage.getItem("todoList")) || [],
  filterStatus: "all",
};

const saveTodoListToLocalStorage = (todoList) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      saveTodoListToLocalStorage(state.todoList);
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
      saveTodoListToLocalStorage(state.todoList);
    },
    editTodo: (state, action) => {
      const { id, status, title } = action.payload;
      state.todoList = state.todoList.map((todo) =>
        todo.id === id ? { ...todo, status, title } : todo
      );
      saveTodoListToLocalStorage(state.todoList);
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, updateFilterStatus } =
  todoSlice.actions;

export default todoSlice.reducer;
