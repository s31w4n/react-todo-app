import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { getClasses } from "../utils/getClasses";
import { deleteTodo, editTodo } from "../features/todo/todoSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "../styles/modules/todoItem.module.scss";

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
    dispatch(editTodo({ ...todo, status: checked ? "active" : "complete" }));
    setChecked(!checked);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todo_details}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todo_text,
                todo.status === "complete" && styles["todo_text_completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "EEEE, do, MM/yyyy, p")}
            </p>
          </div>
        </div>
        <div className={styles.todo_actions}>
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
