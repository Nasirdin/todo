import { useEffect, useState } from "react";
import List from "./components/List";

const getLocalData = () => {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {

  const [value, setValue] = useState("");
  const [todos, setTodos] = useState(getLocalData);

  const addTodo = () => {
    setTodos([
      {
        value: value,
        isDone: false,
        id: todos.length + 1,
      },
      ...todos,
    ]);
    setValue("");
  };

  const deleteTodo = (id) => {
    const todoFilter = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(todoFilter);
  };

  const isDoneTodo = (id) => {
    const copyTodo = [...todos];
    const findTodo = copyTodo.find((todo) => {
      return todo.id === id;
    });
    findTodo.isDone = !findTodo.isDone;
    setTodos(copyTodo);
  };

  const editTodo = () => {
    localStorage.setItem("data", JSON.stringify(todos));
  };

  const btnSubmit = (e) => {
    e.preventDefault();
    addTodo(e);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App ">
      <div className="container">
        <div className="todo bg-gray-400 w-[400px] mx-auto text-center p-5 rounded-lg">
          <h1 className="todo__title text-3xl mb-5 font-medium">Todo list</h1>
          <form
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onSubmit={btnSubmit}
            className="mb-[20px] flex"
          >
            <label className=" inline-block w-[100%]">
              <input
                className="todo__input w-[100%]"
                type="text"
                value={value}
                required
              />
            </label>
            <button className="todo__add-btn bg-[#f00f00] px-2 hover:bg-yellow-700">
              +
            </button>
          </form>
          {!todos
            ? console.log("null")
            : todos.map((todo) => (
                <List
                  todo={todo}
                  setTodos={setTodos}
                  deleteTodo={deleteTodo}
                  isDoneTodo={isDoneTodo}
                  editTodo={editTodo}
                  key={todo.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
