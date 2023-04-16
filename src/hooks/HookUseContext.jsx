import { createContext, useContext, useState } from "react";
import StyleBox from "../common/StyleBox";
import TaskApp from "../../TaskApp/index";

const ThemeContext = createContext(null);

const Button = ({ children }) => {
  const theme = useContext(ThemeContext);
  const style =
    theme === "light"
      ? { border: "1px solid #212121" }
      : { color: "#fff", backgroundColor: "#212121", border: "1px solid #fff" };
  return (
    <button style={{ padding: "5px", marginRight: "5px", ...style }}>
      {children}
    </button>
  );
};

const Panel = ({ title, children }) => {
  const theme = useContext(ThemeContext);
  const style =
    theme === "light" ? {} : { color: "#fff", backgroundColor: "#212121" };
  return (
    <div
      style={{
        width: "300px",
        border: "1px solid #212121",
        padding: "5px 10px",
        ...style,
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

const Form = () => {
  return (
    <Panel title="welcome">
      <Button>sign in</Button>
      <Button>sign up</Button>
    </Panel>
  );
};

const MyAppComponent = () => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === "dark" ? true : false}
          onChange={() => setTheme((e) => (e === "light" ? "dark" : "light"))}
        />
        Use Dark Mode
      </label>
    </ThemeContext.Provider>
  );
};

const ObjectContext = createContext(null);

const FormObject = () => {
  const { user, setUser } = useContext(ObjectContext);
  if (!user) {
    return <button onClick={() => setUser("Alex")}>login</button>;
  }
  return (
    <>
      <p>login successfully by {user}</p>
      <button onClick={() => setUser("")}>logout</button>
    </>
  );
};

const UpdatingObjectContext = () => {
  const [user, setUser] = useState(null);
  return (
    <ThemeContext.Provider value="light">
      <ObjectContext.Provider value={{ user, setUser }}>
        <Panel title="Welcome">
          <FormObject />
        </Panel>
      </ObjectContext.Provider>
    </ThemeContext.Provider>
  );
};

const CurrentUserContext = createContext(null);

const LoginForm = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName !== "" && lastName !== "";

  if (currentUser) {
    return (
      <>
        <p>You are logged in as {currentUser}</p>
        <button
          onClick={() => {
            setCurrentUser("");
            setFirstName("");
            setLastName("");
          }}
        >
          logout
        </button>
      </>
    );
  }
  return (
    <form>
      <label>
        First Name :
        <input
          type="text"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name :
        <input
          type="text"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (!canLogin) return;
          setCurrentUser(`${firstName} ${lastName}`);
        }}
      >
        login
      </button>
      <> both are required</>
    </form>
  );
};

const MultipleContextComponent = () => {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState("");
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Panel title="Welcome">
          <LoginForm />
        </Panel>
        <label>
          <input
            type="checkbox"
            checked={theme === "light" ? false : true}
            onChange={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          />{" "}
          Use Dark Mode
        </label>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
};

const MyProvider = ({ theme, currentUser, setCurrentUser, children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
};

const ExtractingProvider = () => {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState("");
  return (
    <MyProvider
      theme={theme}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    >
      <Panel title="Welcome">
        <LoginForm />
      </Panel>
      <label>
        <input
          type="checkbox"
          checked={theme === "light" ? false : true}
          onChange={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        />{" "}
        Use Dark Mode
      </label>
    </MyProvider>
  );
};

const OveridingTheme = () => {
  return (
    <ThemeContext.Provider value="dark">
      <Panel title="welcome">
        <Button>sign in</Button>
        <Button>sign up</Button>
        <ThemeContext.Provider value="light">
          <Button>Overiding theme</Button>
        </ThemeContext.Provider>
      </Panel>
    </ThemeContext.Provider>
  );
};

const LevelContext = createContext(0);

const Heading = ({ children }) => {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error("Heading must be inside a Section!");
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error("Unknown level: " + level);
  }
};

const Section = ({ children }) => {
  const value = useContext(LevelContext);
  return (
    <section
      style={{
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        border: "1px solid #aaa",
      }}
    >
      <LevelContext.Provider value={value + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
};

const LevelComponent = () => {
  return (
    <div style={{ width: "300px" }}>
      <Section>
        <Heading>Title</Heading>
        <Section>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Section>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Section>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </div>
  );
};

const HookUseContext = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Updating a value via context">
        <MyAppComponent />
      </StyleBox>
      <StyleBox heading="Updating an object via context">
        <UpdatingObjectContext />
      </StyleBox>
      <StyleBox heading="Multiple Context">
        <MultipleContextComponent />
      </StyleBox>
      <StyleBox heading="Extracting provider to component">
        <ExtractingProvider />
      </StyleBox>
      <StyleBox heading="Scaling up with context and a reducer">
        <TaskApp />
      </StyleBox>
      <StyleBox heading="Overriding a theme">
        <OveridingTheme />
      </StyleBox>
      <StyleBox heading="Automatically nested headings ">
        <LevelComponent />
      </StyleBox>
    </div>
  );
};

export default HookUseContext;
