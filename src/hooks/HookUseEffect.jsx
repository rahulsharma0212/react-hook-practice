import { useEffect, useState } from "react";
import StyleBox from "../common/StyleBox";

function createConnection(serverUrl, roomId) {
  return {
    connect() {
      console.log(` Connecting to ${roomId} room at ${serverUrl} ...`);
    },
    disconnect() {
      console.log(` Disconnected to ${roomId} room at ${serverUrl} ...`);
    },
  };
}

const ChatRoom = ({ roomId }) => {
  const [serverUrl, setServerUrl] = useState("http://localhost:1234");

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <>
      server url
      <input
        type="text"
        value={serverUrl}
        onChange={(e) => setServerUrl(e.target.value)}
      />
      <br />
      <h4>{`Welcome to the ${roomId} room!`}</h4>
    </>
  );
};

const ConnectToChatServer = () => {
  const [roomId, setRoomId] = useState("general");
  const [isOpen, setIsopen] = useState(false);
  return (
    <>
      Choose the Chat room :{" "}
      <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
        <option value="general">general</option>
        <option value="travel">travel</option>
        <option value="music">music</option>
      </select>{" "}
      <button onClick={() => setIsopen((e) => !e)}>
        {isOpen ? "close" : "open"} chat
      </button>
      {isOpen && <hr />}
      {isOpen && <ChatRoom roomId={roomId} />}
    </>
  );
};

const PointerGlobal = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    console.log("[Add] global pointer listener");
    window.addEventListener("pointermove", (e) => {
      handleMove(e);
    });
    return () => {
      console.log("[Remove] global pointer listener");
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);
  return <pre>{JSON.stringify(pos, null, 5)}</pre>;
};

const ListenGlobalHandler = () => {
  const [isListen, setIsListen] = useState(false);

  return (
    <>
      <button onClick={() => setIsListen((e) => !e)}>
        {!isListen ? "On" : "Off"} global pointer event
      </button>
      {isListen && <PointerGlobal />}
    </>
  );
};

const HookUseEffect = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Connecting to chat Server">
        <ConnectToChatServer />
      </StyleBox>
      <StyleBox heading="Listening to global browser Event">
        <ListenGlobalHandler />
      </StyleBox>
    </div>
  );
};
export default HookUseEffect;
