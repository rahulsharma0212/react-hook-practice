import { useState } from "react";
import StyleBox from "../common/StyleBox";

const CountNumber = () => {
  const [count, setCount] = useState(0); //number
  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      you pressed me {count} times
    </button>
  );
};

const TextField = () => {
  const [text, setText] = useState(""); //text
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      You typed : {text}
      <br />
      <button onClick={() => setText("")}>reset</button>
    </>
  );
};

const Checkbox = () => {
  const [like, setLike] = useState(false); //boolean
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={like}
          onChange={(e) => setLike(e.target.checked)}
        />
        I liked this
      </label>
      <br />
      {`you ${like ? "liked" : "did not like"} this`}
    </>
  );
};

const FormTwoVariable = () => {
  const [name, setName] = useState("Alex");
  const [age, setAge] = useState(20);
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={() => setAge(age + 1)}>Increment Age</button>
      <button onClick={() => setAge(age - 1)}>Decrement Age</button>
      <br />
      {`Hello ${name}, You are ${age}`}
    </>
  );
};

const PassingUpdateFunction = ({ nextState }) => {
  const [age, setAge] = useState(25);
  function increment() {
    if (!nextState) setAge((age) => age + 1);
    else setAge(age + 1);
  }

  return (
    <>
      <h3>your age {age}</h3>
      <button
        onClick={() => {
          increment();
          increment();
          increment();
        }}
      >
        + 3
      </button>
      <button
        onClick={() => {
          increment();
        }}
      >
        + 1
      </button>
    </>
  );
};

const InputText = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange}></input>;
};

const FormObject = () => {
  const [user, setUser] = useState({
    firstName: "alan",
    lastName: "walker",
    email: "alan@example.com",
  });
  return (
    <form>
      <label>
        First name :{" "}
        <InputText
          value={user.firstName}
          onChange={(e) =>
            setUser({
              ...user,
              firstName: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Last name :{" "}
        <InputText
          value={user.lastName}
          onChange={(e) =>
            setUser({
              ...user,
              lastName: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Email :{" "}
        <InputText
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />
      </label>
      <br />
      {`${user.firstName} ${user.lastName} ${user.email}`}
      <br />
      <pre>{JSON.stringify(user, null, 5)}</pre>
    </form>
  );
};

const FormNested = () => {
  const [user, setUser] = useState({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  return (
    <form>
      <label>
        Name :{" "}
        <InputText
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Tile :{" "}
        <InputText
          value={user.artwork.title}
          onChange={(e) =>
            setUser({
              ...user,
              artwork: {
                ...user.artwork,
                title: e.target.value,
              },
            })
          }
        />
      </label>
      <br />
      <label>
        City :{" "}
        <InputText
          value={user.artwork.city}
          onChange={(e) =>
            setUser({
              ...user,
              artwork: {
                ...user.artwork,
                city: e.target.value,
              },
            })
          }
        />
      </label>
      <br />
      <label>
        Image :{" "}
        <InputText
          value={user.artwork.image}
          onChange={(e) =>
            setUser({
              ...user,
              artwork: {
                ...user.artwork,
                image: e.target.value,
              },
            })
          }
        />
      </label>
      <br />
      {`${user.artwork.title} by ${user.name}`}
      <br />({`located in ${user.artwork.city}`})
      <br />
      <pre>{JSON.stringify(user, null, 5)}</pre>
    </form>
  );
};

const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  return (
    <>
      <input
        type="text"
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          setTitle("");
          onAddTodo(title);
        }}
      >
        Add todo
      </button>
    </>
  );
};

const Task = ({ todo, onChangeTodo, onDeleteTodo }) => {
  const [edit, setEdit] = useState(false);
  let content;
  if (edit) {
    content = (
      <>
        <InputText
          value={todo.title}
          onChange={(e) => onChangeTodo({ ...todo, title: e.target.value })}
        />
        <button onClick={() => setEdit(false)}>save</button>
      </>
    );
  } else {
    content = (
      <>
        {todo.title}
        <button onClick={() => setEdit(true)}>edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          onChangeTodo({ ...todo, done: !todo.done });
        }}
      />
      {content}
      <button
        onClick={() => {
          onDeleteTodo(todo.id);
        }}
      >
        delete
      </button>
    </label>
  );
};

const TaskList = ({ todos, onChangeTodo, onDeleteTodo }) => {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChangeTodo={onChangeTodo}
            onDeleteTodo={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
};

let nextId = 2;
const ListArray = () => {
  const [todos, setTodos] = useState([
    { id: 0, title: "go for walk", done: true },
    { id: 1, title: "go to market", done: false },
  ]);
  function addTodo(title) {
    setTodos([...todos, { id: nextId++, title: title, done: false }]);
  }
  function changeTodo(updatedTodo) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        } else {
          return todo;
        }
      })
    );
  }
  function deleteTodo(id) {
    setTodos([...todos.filter((e) => e.id !== id)]);
  }
  return (
    <>
      <AddTodo onAddTodo={addTodo} />
      <TaskList
        onChangeTodo={changeTodo}
        todos={todos}
        onDeleteTodo={deleteTodo}
      />
      <pre>{JSON.stringify(todos, null, 5)}</pre>
    </>
  );
};

function createInitialTodos(count = 5) {
  console.log("[running] createInitialTodos");
  return Array.from(Array(count), (e, i) => ({ id: i, title: `item ${i}` }));
}

const PassInitializer = () => {
  const [todos, setTodos] = useState(createInitialTodos);
  const [title, setTitle] = useState("");
  return (
    <>
      <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => {
          setTodos([{ id: todos.length, title }, ...todos]);
          setTitle("");
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((e) => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </>
  );
};
const PassInitialState = () => {
  const [todos, setTodos] = useState(createInitialTodos());
  const [title, setTitle] = useState("");
  return (
    <>
      <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => {
          setTodos([{ id: todos.length, title }, ...todos]);
          setTitle("");
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((e) => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </>
  );
};

const ResetingStateWithKey = () => {
  const [version, setVersion] = useState(0);
  return (
    <>
      <button onClick={() => setVersion((e) => e + 1)}>reset</button>
      <br />
      <TextField key={version} />
    </>
  );
};

const HookUseState = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Counter (number)">
        <CountNumber />
      </StyleBox>
      <StyleBox heading="Text field (string)">
        <TextField />
      </StyleBox>
      <StyleBox heading="Checkbox (Boolean)">
        <Checkbox />
      </StyleBox>
      <StyleBox heading="FormTwoVariable (text | Boolean)">
        <FormTwoVariable />
      </StyleBox>
      <StyleBox heading="PassingUpdateFunction to set State">
        <PassingUpdateFunction />
      </StyleBox>
      <StyleBox heading="Passing next state directly">
        <PassingUpdateFunction nextState />
      </StyleBox>
      <StyleBox heading="Form (Object)">
        <FormObject />
      </StyleBox>
      <StyleBox heading="Form (Nested Object)">
        <FormNested />
      </StyleBox>
      <StyleBox heading="Form (Array)">
        <ListArray />
      </StyleBox>
      <StyleBox heading="Passing the initializer function">
        <PassInitializer />
      </StyleBox>
      <StyleBox heading="Passing the initial state directly">
        <PassInitialState />
      </StyleBox>
      <StyleBox heading="Passing the initial state directly">
        <ResetingStateWithKey />
      </StyleBox>
    </div>
  );
};

export default HookUseState;
