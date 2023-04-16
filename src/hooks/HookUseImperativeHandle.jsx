import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import StyleBox from "../common/StyleBox";

const MyInput = forwardRef((props, ref) => {
  const iRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          iRef.current.focus();
        },
      };
    },
    []
  );

  return <input type="text" {...props} ref={iRef} />;
});

const ParentComponent = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  return (
    <>
      <MyInput
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          inputRef.current.focus();
          // this below line give error bcoz we only expose focus method
          // inputRef.current.style.color = "blue";
        }}
      >
        edit
      </button>
    </>
  );
};

const CommentList = forwardRef((_, ref) => {
  const listRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom() {
          const list = listRef.current;
          list.scrollTop = list.scrollHeight;
        },
      };
    },
    []
  );

  return (
    <ul
      ref={listRef}
      style={{ height: "250px", width: "200px", overflowY: "scroll" }}
    >
      {Array.from(Array(50), (_, i) => (
        <li key={i}>comment #{i + 1}</li>
      ))}
    </ul>
  );
});

const AddComment = forwardRef((_, ref) => {
  const [val, setVal] = useState("");
  return (
    <input
      type="text"
      ref={ref}
      placeholder="Add comment"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
});

const Post = forwardRef((_, ref) => {
  const listRef = useRef(null);
  const commentRef = useRef(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        scrollAndFocusAddComment() {
          commentRef.current.focus();
          listRef.current.scrollToBottom();
        },
      };
    },
    []
  );

  return (
    <>
      <article>Welcome to my Blog</article>
      <CommentList ref={listRef} />
      <AddComment ref={commentRef} />
    </>
  );
});

const PostCommentComponent = () => {
  const ref = useRef(null);
  return (
    <>
      <button
        onClick={() => {
          ref.current.scrollAndFocusAddComment();
        }}
      >
        Write a component
      </button>
      <br />
      <br />
      <Post ref={ref} />
    </>
  );
};

const HookUseImperativeHandle = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyleBox heading="Exposing a custom ref handle to the parent component ">
        <ParentComponent />
      </StyleBox>
      <StyleBox heading="Exposing your own imperative methods ">
        <PostCommentComponent />
      </StyleBox>
    </div>
  );
};

export default HookUseImperativeHandle;
