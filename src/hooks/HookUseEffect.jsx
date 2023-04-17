import { useEffect, useRef, useState } from "react";
import StyleBox from "../common/StyleBox";
import { FadeInAnimation } from "../script/animation";

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

const ConnectToChatServer = ({ custom }) => {
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
      {isOpen && !custom && <ChatRoom roomId={roomId} />}
      {isOpen && custom && <CustomChatRoom roomId={roomId} />}
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

const Welcome = () => {
  const headingRef = useRef();

  useEffect(() => {
    const animation = new FadeInAnimation(headingRef.current);
    animation.start(1000);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      style={{
        opacity: 0,
        color: "white",
        padding: 50,
        textAlign: "center",
        fontSize: 50,
        backgroundImage:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
      }}
    >
      Welcome
    </h1>
  );
};

const TrigerAnimation = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow((e) => !e)}>
        {!show ? "show" : "hide"}
      </button>
      {show && <Welcome />}
    </>
  );
};

const ModalDialog = ({ isOpen, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const modal = ref.current;
    if (isOpen) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [isOpen]);
  return <dialog ref={ref}>{children}</dialog>;
};

const ControlModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShow((e) => !e);
        }}
      >{`${!show ? "open" : "close"} Modal`}</button>
      <ModalDialog isOpen={show}>
        hi there <br />
        <button onClick={() => setShow(false)}>Hide Modal</button>
      </ModalDialog>
    </>
  );
};

const LongSection = ({ count = 20 }) => {
  return (
    <ul>
      {Array.from(Array(count), (_, i) => {
        return <li key={i}>item {`#${i}`} (keep scrolling)</li>;
      })}
    </ul>
  );
};

const Box = () => {
  const ref = useRef(null);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        div.parentElement.style.backgroundColor = "#212121";
        div.parentElement.style.color = "#fff";
      } else {
        div.parentElement.style.color = "#212121";
        div.parentElement.style.backgroundColor = "#fff";
      }
    });
    observer.observe(div, { threshold: 1 });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        margin: 20,
        height: 20,
        width: "100%",
        border: "2px solid black",
        backgroundColor: "orangered",
      }}
    />
  );
};

const TrackingVisibility = ({ custom }) => {
  return (
    <div
      style={{
        height: "150px",
        width: "250px",
        border: "1px solid #212121",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <LongSection />
      {custom ? <CustomBox /> : <Box />}
      <LongSection />
      {custom ? <CustomBox /> : <Box />}
      <LongSection />
    </div>
  );
};

const useChatRoom = ({ serverUrl, roomId }) => {
  console.log("[custom hook useChatRoom]");
  useEffect(() => {
    const connection = new createConnection();
    connection.connect(serverUrl, roomId);
    return () => {
      connection.disconnect(serverUrl, roomId);
    };
  }, [serverUrl, roomId]);
};

function CustomChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("http://localhost:1234");

  useChatRoom({ serverUrl, roomId });
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
}

const useWindowListener = (eventType, callback) => {
  useEffect(() => {
    window.addEventListener(eventType, callback);
    return () => {
      window.removeEventListener(eventType, callback);
    };
  }, [eventType, callback]);
};

const CustomGlobalHandler = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useWindowListener("pointermove", (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  });

  return <pre>{JSON.stringify(pos, null, 5)}</pre>;
};

const useIntersectionObserver = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(div, { threshold: 1 });
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

function CustomBox() {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref);
  useEffect(() => {
    const div = ref.current;
    if (isIntersecting) {
      div.parentElement.style.backgroundColor = "#212121";
      div.parentElement.style.color = "#fff";
    } else {
      div.parentElement.style.color = "#212121";
      div.parentElement.style.backgroundColor = "#fff";
    }
  }, [isIntersecting]);
  return (
    <div
      ref={ref}
      style={{
        margin: 20,
        height: 20,
        width: "100%",
        border: "2px solid black",
        backgroundColor: "orangered",
      }}
    />
  );
}

const HookUseEffect = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Connecting to chat Server">
        <ConnectToChatServer />
      </StyleBox>
      <StyleBox heading="Listening to global browser Event">
        <ListenGlobalHandler />
      </StyleBox>
      <StyleBox heading="Trigger an animation">
        <TrigerAnimation />
      </StyleBox>
      <StyleBox heading="Controlling Modal dialog">
        <ControlModal />
      </StyleBox>
      <StyleBox heading="Tracking element visibility">
        <TrackingVisibility />
      </StyleBox>
      <StyleBox heading="Custom useChatRoom Hook">
        <ConnectToChatServer custom />
      </StyleBox>
      <StyleBox heading="Custom useWindowListener Hook">
        <CustomGlobalHandler />
      </StyleBox>
      <StyleBox heading="Custom useIntersectionObserver Hook ">
        <TrackingVisibility custom />
      </StyleBox>
    </div>
  );
};

export default HookUseEffect;
