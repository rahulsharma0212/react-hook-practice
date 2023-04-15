import { forwardRef, useRef, useState } from "react";
import StyleBox from "../common/StyleBox";

const ClickCounter = () => {
  const countRef = useRef(0);
  return (
    <>
      <button
        onClick={() => {
          countRef.current += 1;
          alert(`you clicked ${countRef.current} time`);
        }}
      >
        click
      </button>
    </>
  );
};

const StopWatch = () => {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  let intervalRef = useRef();

  let timer = 0.0;
  if (startTime !== null && now !== null) {
    timer = (now - startTime) / 1000;
  }

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }
  function handleReset() {
    setStartTime(Date.now());
    setNow(Date.now());
    clearInterval(intervalRef.current);
  }

  return (
    <>
      <h2>Time passed {timer}</h2>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
};

const FocusTextInput = () => {
  const ref = useRef(null);
  return (
    <>
      <input ref={ref} />
      <button
        onClick={() => {
          ref.current.focus();
        }}
      >
        focus input
      </button>
    </>
  );
};

const IMG_DATA = [
  {
    name: "Tom",
    img: "https://placekitten.com/g/200/200",
  },
  {
    name: "Maru",
    img: "https://placekitten.com/g/300/200",
  },
  {
    name: "Jellylorum",
    img: "https://placekitten.com/g/250/200",
  },
];

const ScrollImageToFocus = () => {
  const ref = useRef(null);

  function focusInto(index) {
    const list = ref.current;
    list.querySelectorAll("img")[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  return (
    <div>
      <div>
        {IMG_DATA.map((e, i) => (
          <button
            key={i}
            style={{ marginRight: "5px" }}
            onClick={() => focusInto(i)}
          >
            {e.name}
          </button>
        ))}
      </div>
      <ul
        ref={ref}
        style={{
          width: "250px",
          overflow: "hidden",
          border: "2px solid orangered",
          display: "flex",
          gap: "5px",
        }}
      >
        {IMG_DATA.map((e, i) => {
          return <img key={i} src={e.img} alt={e.name} />;
        })}
      </ul>
    </div>
  );
};

const VideoRefComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <>
      <button
        onClick={() => {
          setIsPlaying((e) => !e);
          if (!isPlaying) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }}
      >
        {isPlaying ? "pause" : "play"}
      </button>
      <br />
      <video ref={videoRef} style={{ width: "250px" }}>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></source>
      </video>
    </>
  );
};

const MyInput = forwardRef(({ value, onChange }, ref) => {
  return <input type="text" ref={ref} value={value} onChange={onChange} />;
});

const RefToOwnComponent = () => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  return (
    <>
      <MyInput
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        focus
      </button>
    </>
  );
};

const HookUseRef = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Click counter">
        <ClickCounter />
      </StyleBox>
      <StyleBox heading="Stop Watch">
        <StopWatch />
      </StyleBox>
      <StyleBox heading="Focus a text input">
        <FocusTextInput />
      </StyleBox>
      <StyleBox heading="Scrolling an image into view ">
        <ScrollImageToFocus />
      </StyleBox>
      <StyleBox heading="Play and pausing a video">
        <VideoRefComponent />
      </StyleBox>
      <StyleBox heading="Exposing a ref to your own component ">
        <RefToOwnComponent />
      </StyleBox>
    </div>
  );
};

export default HookUseRef;
