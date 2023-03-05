import React, { useState } from "react";
import { format } from "date-fns";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTodo } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";

function TodoItem({ todo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Item Deleted Successfully");
  };

  const handleEdit = () => {
    setModalOpen(true);
  };
  
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleEdit}
            onKeyDown={handleEdit}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="edit"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
