import React, { useState } from "react";
import Button from "./Button";
import { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../features/todo/todoSlice";

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const { filterStatus } = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  const updateFilter = (event) => {
    dispatch(updateFilterStatus(event.target.value));
  };

  return (
    <div className={styles.app_header}>
      <Button
        type="button"
        variant="primary"
        onClick={() => setModalOpen(true)}
      >
        Add Task
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="active">active</option>
        <option value="complete">complete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
