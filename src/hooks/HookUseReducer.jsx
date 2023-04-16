import { useReducer, useState } from "react";
import StyleBox from "../common/StyleBox";

function simpleReducer(state, action) {
  debugger;
  switch (action.type) {
    case "INCREMENT_AGE": {
      return { age: state.age + 1 };
    }
    default:
      break;
  }
}

const SimpleReducerComponent = () => {
  const [user, dispatch] = useReducer(simpleReducer, { age: 21 });
  return (
    <>
      <button onClick={() => dispatch({ type: "INCREMENT_AGE" })}>
        increment the age
      </button>
      <p>hii I am {user.age}</p>
    </>
  );
};
const formObjectReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_AGE": {
      return { ...state, age: state.age + 1 };
    }
    case "CHANGE_NAME": {
      return { ...state, name: action.payload };
    }
    default: {
    }
  }
};

const FormObjectComponent = () => {
  const [user, dispatch] = useReducer(formObjectReducer, {
    name: "Rahul",
    age: 21,
  });
  return (
    <>
      <input
        type="text"
        value={user.name}
        onChange={(e) =>
          dispatch({ type: "CHANGE_NAME", payload: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "INCREMENT_AGE" })}>
        increment age
      </button>
      <h3>
        Hello {user.name} , You are {user.age}
      </h3>
    </>
  );
};

const AddTodo = ({ addTodoHandler }) => {
  const [val, setVal] = useState("");
  return (
    <>
      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
      <button
        onClick={() => {
          setVal("");
          addTodoHandler(val);
        }}
      >
        add
      </button>
    </>
  );
};

const TodoComponent = ({ todo, editTodo, toggleStatus, deleteTodoHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(todo.activity);
  let component;
  if (isEdit) {
    component = (
      <>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </>
    );
  } else {
    component = <>{todo.activity}</>;
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleStatus(todo.id)}
      />
      {component}
      <button
        onClick={() => {
          setIsEdit((e) => !e);
          if (isEdit) {
            editTodo(todo.id, value);
          }
        }}
      >
        {isEdit ? "save" : "edit"}
      </button>
      <button onClick={() => deleteTodoHandler(todo.id)}>delete</button>
    </li>
  );
};

const ListTodo = ({ todos, editTodo, toggleStatus, deleteTodoHandler }) => {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
      {todos.map((todo) => {
        return (
          <TodoComponent
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            toggleStatus={toggleStatus}
            deleteTodoHandler={deleteTodoHandler}
          />
        );
      })}
    </ul>
  );
};

const initialTodos = [
  { id: 0, activity: "Go for walk", done: true },
  { id: 1, activity: "Go for market", done: false },
];
let nextId = 2;

function reducerForTodo(state, action) {
  switch (action.type) {
    case "EDIT_TODO": {
      return state.map((e) => {
        if (e.id === action.id) {
          return { ...e, activity: action.activity };
        } else {
          return e;
        }
      });
    }
    case "TOGGLE_STATUS": {
      return state.map((e) => {
        if (e.id === action.id) {
          return { ...e, done: !e.done };
        } else {
          return e;
        }
      });
    }
    case "ADD_TODO": {
      return [
        ...state,
        { id: nextId++, activity: action.activity, done: false },
      ];
    }
    case "DELETE_TODO": {
      return state.filter((e) => e.id !== action.id);
    }
    default: {
      throw Error("unknown action", action.type);
    }
  }
}

const TodoListComponent = () => {
  const [todos, dispatch] = useReducer(reducerForTodo, initialTodos);

  const editTodo = (id, value) => {
    dispatch({ type: "EDIT_TODO", id: id, activity: value });
  };

  const toggleStatus = (id) => dispatch({ type: "TOGGLE_STATUS", id: id });

  const addTodoHandler = (activity) =>
    dispatch({ type: "ADD_TODO", activity: activity });

  const deleteTodoHandler = (id) => dispatch({ type: "DELETE_TODO", id: id });

  return (
    <>
      <AddTodo addTodoHandler={addTodoHandler} />
      <ListTodo
        todos={todos}
        editTodo={editTodo}
        toggleStatus={toggleStatus}
        deleteTodoHandler={deleteTodoHandler}
      />
    </>
  );
};

const createInitialState = (userName) => {
  console.log("[running]->> initializer function");
  return {
    draft: "",
    todos: Array.from(Array(20), (_, i) => ({
      id: i,
      text: `${userName}'s task #${i + 1}`,
    })),
  };
};

const initializerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        draft: "",
        todos: [{ id: state.todos.length, text: state.draft }, ...state.todos],
      };
    }
    case "ADD_DRAFT": {
      return {
        ...state,
        draft: action.text,
      };
    }
    default: {
      throw Error("Invalid action type");
    }
  }
};

const InitializerReducerComponent = ({ userName }) => {
  const [state, dispatch] = useReducer(
    initializerReducer,
    userName,
    createInitialState
  );
  return (
    <>
      <input
        type="text"
        value={state.draft}
        onChange={(e) => dispatch({ type: "ADD_DRAFT", text: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "ADD_TODO" })}>add</button>
      <ul>
        {state.todos.map((e) => (
          <li key={e.id}>{e.text}</li>
        ))}
      </ul>
    </>
  );
};
const StateDirectlyComponent = ({ userName }) => {
  const [state, dispatch] = useReducer(
    initializerReducer,
    createInitialState(userName)
  );
  return (
    <>
      <input
        type="text"
        value={state.draft}
        onChange={(e) => dispatch({ type: "ADD_DRAFT", text: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "ADD_TODO" })}>add</button>
      <ul>
        {state.todos.map((e) => (
          <li key={e.id}>{e.text}</li>
        ))}
      </ul>
    </>
  );
};

const HookUseReducer = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="simple reducer">
        <SimpleReducerComponent />
      </StyleBox>
      <StyleBox heading="Form (object)">
        <FormObjectComponent />
      </StyleBox>
      <StyleBox heading="Todo list (array)">
        <TodoListComponent />
      </StyleBox>
      <StyleBox heading="Passing the initializer function">
        <InitializerReducerComponent userName="Taylor" />
      </StyleBox>
      <StyleBox heading="Passing the initial state directly">
        <StateDirectlyComponent userName="Taylor" />
      </StyleBox>
    </div>
  );
};

export default HookUseReducer;
