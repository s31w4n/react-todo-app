import React, { useState, useEffect } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { addTodo, editTodo } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "edit" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "edit") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(editTodo({ ...todo, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form
              className={styles.form}
              onSubmit={(event) => handleSubmit(event)}
            >
              <h1 className={styles.formTitle}>
                {type === "edit" ? "Edit" : "Add"} Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "edit" ? "Edit" : "Add"} Task
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
