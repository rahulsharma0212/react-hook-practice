import { useContext, useState } from "react";
import { TasksDispatchContext } from "./TaskContext";

let nextId = 3;
const AddTask = () => {
  const [val, setVal] = useState("");
  const dispatch = useContext(TasksDispatchContext);
  const addTaskHandler = () => {
    dispatch({
      type: "ADDED",
      id: nextId++,
      text: val,
    });
  };
  return (
    <>
      <input
        type="text"
        placeholder="Add Task"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={addTaskHandler} disabled={val === ""}>
        Add
      </button>
    </>
  );
};

export default AddTask;
