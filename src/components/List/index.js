import React, { useState } from "react";

const List = ({ todo, deleteTodo, isDoneTodo, editTodo }) => {
  // const [isDone, setIsDone] = useState(todo.isDone);
  const [readOnly, setReadOnly] = useState(true);
  const [todoValue, setTodoValue] = useState(todo.value);

  const editBtn = () => {
    if (!readOnly) {
      todo.value = todoValue;
      todo.isDone = setReadOnly(!readOnly);
    } else {
      setReadOnly(!readOnly);
    }
    editTodo();
  };

  return (
    <div className="list flex justify-between bg-blue-200 p-2 mb-[10px]">
      <input
        className="list__check"
        type="checkbox"
        onClick={() => isDoneTodo(todo.id)}
        checked={todo.isDone}
      />
      <input
        type="text"
        defaultValue={todoValue}
        className={todo.isDone ? "line-through" : " "}
        readOnly={readOnly}
        onChange={(e) => {
          setTodoValue(e.target.value);
        }}
      />
      <div className="list__btns">
        <button
          className="list__edit bg-red-500 mr-1 px-[10px]"
          onClick={editBtn}
        >
          {readOnly ? "edit" : "save"}
        </button>
        <button
          className="list__delete bg-black text-white px-[10px]"
          onClick={() => deleteTodo(todo.id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default List;
