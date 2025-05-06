import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  children: number[];
  parentId: number | null;
}

const Comment = (props: {
  comment: Comment;
  onAdd: (arg: string, parentId: number) => void;
  allComments: Comment[];
  onDelete: (arg: number) => void;
}) => {
  const [addingComment, setAddingComment] = useState(false);
  const [inputText, setInputText] = useState("");
  const { text, id, children } = props.comment ?? {};
  const commentsObj = props.allComments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    return acc;
  }, {} as Record<number, Comment>);
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
                props.onAdd(inputText, id);
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
          <button
            className="h-8 !py-0 !bg-transparent text-black ml-0.5"
            onClick={() => props.onDelete(id)}
          >
            Delete
          </button>
        </div>
      )}
      <div className="ml-12 flex-col">
        {children.map((i) => (
          <Comment
            comment={commentsObj[i]}
            onAdd={props.onAdd}
            allComments={props.allComments}
            onDelete={props.onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default function Post2() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [addingComment, setAddingComment] = useState(false);
  const [inputText, setInputText] = useState("");
  const commentsObj = comments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    return acc;
  }, {} as Record<number, Comment>);
  return (
    <div className="flex-col">
      <p className="text-black">
        This is the post with comments with centralized state.
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
                setComments([
                  ...comments,
                  {
                    id: comments[comments.length - 1]?.id + 1 || 0,
                    text: inputText,
                    children: [],
                    parentId: null,
                  },
                ]);
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
        {comments
          .filter((_j) => _j.parentId === null)
          .map((i) => (
            <Comment
              comment={i}
              onDelete={(id) => {
                setComments(
                  comments.filter(
                    (j) => j.id !== id && !j.children.includes(id)
                  )
                );
                setComments(
                  comments.filter(
                    (j) =>
                      j.id !== id && !commentsObj[id].children.includes(j.id)
                  )
                );
                console.log(
                  comments.filter(
                    (j) =>
                      j.id !== id && !commentsObj[id].children.includes(j.id)
                  )
                );
              }}
              allComments={comments}
              onAdd={(txt, id) => {
                setComments([
                  ...comments.map((j) => {
                    if (j.id === id) {
                      j.children.push(
                        comments[comments.length - 1]?.id + 1 || 0
                      );
                    }
                    return j;
                  }),
                  {
                    id: comments[comments.length - 1]?.id + 1 || 0,
                    text: txt,
                    children: [],
                    parentId: id,
                  },
                ]);
              }}
            />
          ))}
      </div>
    </div>
  );
}
