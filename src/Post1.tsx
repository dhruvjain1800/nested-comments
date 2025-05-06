import React, { useState } from "react";

const Comment = ({ text }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [addingComment, setAddingComment] = useState(false);
  const [inputText, setInputText] = useState("");
  return (
    <div className="ml-2">
      <div className="flex left-0">
        <p className="text-black">{text}</p>
      </div>
      {addingComment ? (
        <div className="flex">
          <input
            className="text-black border-b bg-amber-200 flex-1/2 px-1.5"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="h-8 !p-0 !bg-transparent text-black ml-1"
            onClick={() => {
              if (inputText.length) {
                setComments([...comments, inputText]);
                setInputText("");
                setAddingComment(false);
              }
            }}
          >
            Add
          </button>
          <button
            className="h-8 !p-0 !bg-transparent text-black ml-2"
            onClick={() => {
              setInputText("");
              setAddingComment(false);
            }}
          >
            X
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            className="h-8 !py-0 !bg-transparent text-black ml-auto"
            onClick={() => setAddingComment(true)}
          >
            Reply
          </button>
        </div>
      )}
      <div className="ml-12 flex-col">
        {comments.map((i) => (
          <Comment text={i} />
        ))}
      </div>
    </div>
  );
};

export default function Post1() {
  const [comments, setComments] = useState<string[]>([]);
  const [addingComment, setAddingComment] = useState(false);
  const [inputText, setInputText] = useState("");
  return (
    <div className="flex-col">
      <p className="text-black">
        This is the post with comments with de-centralized state.
      </p>
      {addingComment ? (
        <div className="flex">
          <input
            className="text-black border-b bg-amber-200 flex-1/2 px-1.5"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="h-8 !p-0 !bg-transparent text-black ml-1"
            onClick={() => {
              if (inputText.length) {
                setComments([...comments, inputText]);
                setInputText("");
                setAddingComment(false);
              }
            }}
          >
            Add
          </button>
          <button
            className="h-8 !p-0 !bg-transparent text-black ml-2"
            onClick={() => {
              setInputText("");
              setAddingComment(false);
            }}
          >
            X
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          {" "}
          <button
            className="h-8 !py-0 !bg-transparent text-black ml-auto"
            onClick={() => setAddingComment(true)}
          >
            Reply
          </button>
        </div>
      )}
      <div className="ml-12 flex-col">
        {comments.map((i) => (
          <Comment text={i} />
        ))}
      </div>
    </div>
  );
}
