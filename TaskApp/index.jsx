import AddTask from "./AddTask";
import { TaskProvider } from "./TaskContext";
import TaskList from "./TaskList";

const TaskApp = () => {
  return (
    <TaskProvider>
      <h1>Task Manager</h1>
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
};

export default TaskApp;
