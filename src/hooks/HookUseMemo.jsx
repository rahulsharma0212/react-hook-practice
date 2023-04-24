import { memo, useEffect, useMemo, useRef, useState } from "react";
import StyleBox from "../common/StyleBox";

const createTodos = () => {
  return Array.from(Array(25), (_, i) => ({
    id: i,
    content: `Todo #${i + 1}`,
    completed: Math.random() > 0.5,
  }));
};

const filterTodo = (todos, tab, timer = 500) => {
  console.log(`[Artificially slow down filter by ${timer} ms]`);
  const startTime = Date.now();
  while (Date.now() - startTime < 500) {}
  return todos.filter((todo) => {
    if (tab === "all") return true;
    else if (tab === "active") return !todo.completed;
    else if (tab === "completed") return todo.completed;
    return false;
  });
};

const todos = createTodos();

const ListTodoWithUseMemo = ({ useMemo }) => {
  const [tab, setTab] = useState("all");
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("active")}>Active</button>
      <button onClick={() => setTab("completed")}>Completed</button>
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        dark mode
      </label>
      <hr />
      {useMemo ? (
        <TodoListwithMemo
          todos={todos}
          theme={!isDark ? "light" : "dark"}
          tab={tab}
        />
      ) : (
        <TodoListWithoutMemo
          todos={todos}
          theme={!isDark ? "light" : "dark"}
          tab={tab}
        />
      )}
    </>
  );
};

const TodoListwithMemo = ({ todos, tab, theme }) => {
  const visibleTodo = useMemo(() => {
    return filterTodo(todos, tab);
  }, [todos, tab]);
  return (
    <ul
      style={{
        color: theme === "light" ? "#212121" : "#fff",
        backgroundColor: theme === "dark" ? "#212121" : "#fff",
      }}
    >
      {visibleTodo.map((e) => (
        <li key={e.id}>{!e.completed ? e.content : <s>{e.content}</s>}</li>
      ))}
    </ul>
  );
};
const TodoListWithoutMemo = ({ todos, tab, theme }) => {
  const visibleTodo = filterTodo(todos, tab);
  return (
    <ul
      style={{
        color: theme === "light" ? "#212121" : "#fff",
        backgroundColor: theme === "dark" ? "#212121" : "#fff",
      }}
    >
      {visibleTodo.map((e) => (
        <li key={e.id}>{!e.completed ? e.content : <s>{e.content}</s>}</li>
      ))}
    </ul>
  );
};

const ListTodoWithMemoAndUseMemo = () => {
  const [tab, setTab] = useState("all");
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("active")}>Active</button>
      <button onClick={() => setTab("completed")}>Completed</button>
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        dark mode
      </label>
      <hr />
      <TodoList tab={tab} theme={isDark ? "dark" : "light"} todos={todos} />
    </>
  );
};

const TodoList = ({ tab, theme, todos }) => {
  const filteredTodos = useMemo(() => filterTodo(todos, tab), [todos, tab]);
  // const filteredTodos = filterTodo(todos, tab, 0);
  const prevTodo = useRef(null);
  const prevTab = useRef(null);

  useEffect(() => {
    console.log("[compare-todo]->", Object.is(prevTodo.current, todos));
    console.log("[compare-tab]->", Object.is(prevTab.current, tab));
    prevTodo.current = todos;
    prevTab.current = tab;
  });
  return (
    <>
      <div
        style={{
          color: theme === "dark" ? "#fff" : "#212121",
          backgroundColor: theme !== "dark" ? "#fff" : "#212121",
        }}
      >
        <code>List</code> is artifically slowed down by 500ms
        <List todos={filteredTodos} />
      </div>
    </>
  );
};

const List = memo(({ todos }) => {
  let startTime = Date.now();
  console.log("[Artificially slow down list component]");
  while (Date.now - startTime < 500) {}
  return (
    <ul>
      {todos.map((e) => (
        <li key={e.id}>{e.completed ? <s>{e.content}</s> : e.content}</li>
      ))}
    </ul>
  );
});

const HookUseMemo = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Skipping recalculation with useMemo">
        <ListTodoWithUseMemo useMemo />
      </StyleBox>
      <StyleBox heading="Skipping recalculation without useMemo">
        <ListTodoWithUseMemo />
      </StyleBox>
      <StyleBox heading="Skipping re-rendering with useMemo and memo">
        <ListTodoWithMemoAndUseMemo />
      </StyleBox>
    </div>
  );
};

export default HookUseMemo;
