import React, { useEffect, useState } from "react";
import axios from "axios";
function TodoList() {
  const [todo, setTodo] = useState({
    todo: "",
    status: 1,
  });
  const [listTodo, setListTodo] = useState([]);
  const [reset, setReset] = useState(false);
  const [updatess, setUpdatess] = useState(-1);
  const getApi = async () => {
    const response = await axios.get("http://localhost:6719/apis/todo");
    setListTodo(response.data.todo);
  };
  const [status, setStatus] = useState(true);
  useEffect(() => {
    getApi();
  }, [reset]);
  const chageInp = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (updatess !== -1) {
      const updates = await axios.put(
        `http://localhost:6719/apis/todo/${listTodo[updatess].id}`,
        todo
      );
      setUpdatess(-1); // Corrected from setUpdate(-1)
    } else {
      const res = await axios.post("http://localhost:6719/apis/todo", todo);
    }

    setTodo({ ...todo, todo: "" });
    setReset(!reset);
  };
  const deleteTodo = async (id) => {
    const dele = await axios.delete(`http://localhost:6719/apis/todo/${id}`);
    setReset(!reset);
  };
  const updateTodo = async (id) => {
    setTodo({ ...todo, todo: listTodo[id].todo });
    setUpdatess(id);
  };
  const deleAll = async () => {
    const deleaAll = await axios.delete(
      `http://localhost:6719/apis/todo/${-1}`
    );
    setReset(!reset);
  };
  const statusTodo = async (i) => {
    const newTodo = listTodo[i];
    if (newTodo.status == 0) {
      newTodo.status = 1;
    } else {
      newTodo.status = 0;
    }

    const updates = await axios.put(
      `http://localhost:6719/apis/todo/${newTodo.id}`,
      newTodo
    );
    setReset(!reset);
  };

  return (
    <div>
      <h1>TodoList</h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="todo"
          value={todo.todo}
          id=""
          onChange={chageInp}
        />
        <button type="submit">{updatess == -1 ? "Add" : "Edit"}</button>
      </form>
      <table border={1}>
        <thead>
          <th>stt</th>
          <th>todo</th>
          <th>status</th>
        </thead>
        <tbody>
          {listTodo?.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td className={item.status!=1?"cssTodo":""}>{item.todo}</td>
              <td>
                {" "}
                <button onClick={() => deleteTodo(item.id)}>Delete</button>{" "}
                <button onClick={() => updateTodo(i)}>Edit</button>{" "}
                <button onClick={() => statusTodo(i)}>
                  {item.status == 1 ? "Complete" : "Accomplished"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <button onClick={deleAll}>Xoa tat ca</button>
      </table>
    </div>
  );
}

export default TodoList;
