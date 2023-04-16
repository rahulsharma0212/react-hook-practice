import React, { useContext, useState } from "react";
import { TasksContext, TasksDispatchContext } from "./TaskContext";

const Task = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  let taskContent;
  if (isEdit) {
    taskContent = (
      <>
        <input
          type="text"
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "CHANGED",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button
          onClick={() => {
            setIsEdit(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEdit(true)}>Edit</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "CHANGED",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          dispatch({ type: "DELETED", id: task.id });
        }}
      >
        Delete
      </button>
    </label>
  );
};

const TaskList = () => {
  const tasks = useContext(TasksContext);
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
