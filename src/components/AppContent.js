import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

function AppContent() {
  const todoList = useSelector((store) => store.todo.todoList);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div>
      {sortedTodoList.length > 0
        ? sortedTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : "no todo found"}
    </div>
  );
}

export default AppContent;
