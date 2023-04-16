import { createContext, useReducer } from "react";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

function taskReducer(task, action) {
  switch (action.type) {
    case "ADDED": {
      return [...task, { id: action.id, text: action.text, done: false }];
    }
    case "CHANGED": {
      return task.map((e) => {
        if (e.id === action.task.id) {
          return action.task;
        } else {
          return e;
        }
      });
    }
    case "DELETED": {
      return task.filter((e) => e.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: "Task #1", done: true },
  { id: 1, text: "Task #2", done: false },
  { id: 2, text: "Task #3", done: true },
];
