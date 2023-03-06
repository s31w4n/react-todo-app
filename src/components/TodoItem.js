import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTodo, editTodo } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { motion } from "framer-motion";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Item Deleted Successfully");
  };

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleCheck = () => {
    dispatch(
      editTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
    setChecked(!checked);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
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
      </motion.div>
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
