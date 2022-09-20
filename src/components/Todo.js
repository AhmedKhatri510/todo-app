import React, { useEffect, useState } from "react";
import { app } from "../Firebase";
import "./Todo.css";

import Alert from "./Alert";
import List from "./List";

const getLocaleStorage = () => {
  const list = localStorage.getItem("list");

  if (!list) return [];
  return JSON.parse(list);
};

const App = () => {
  const [todo, setTodo] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [list, setList] = useState(getLocaleStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!todo) {
      //display alert of please enter some text
      showAlert(true, "Please enter some text", "danger");
    } else if (todo && isEditing) {
      //dealing with editing
      const updatedList = list.map((item) => {
        if (item.id === editID) {
          return { id: item.id, title: todo };
        }

        return item;
      });

      setList(updatedList);
      setIsEditing(false);
      setEditID(false);
      setTodo("");
      showAlert(true, "todo changed", "success");
    } else {
      //render the todo into the list
      const newItem = { id: new Date().getTime().toString(), title: todo };
      const saveToFirebase = app.firestore();
      saveToFirebase.collection("todos").add({
        id: new Date().getTime().toString(),
        title: newItem,
      });
      setList([...list, newItem]);
      setTodo("");
      showAlert(true, "Item added to the list", "success");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const removeAlert = () => {
    showAlert("", "");
  };

  const clearList = () => {
    showAlert(true, "All items removed", "danger");
    setList([]);
    setIsEditing(false);
    setTodo("");
  };

  const removeTodo = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "Item removed", "danger");
  };

  const editItem = (id) => {
    // console.log(id);
    setIsEditing(true);
    setEditID(id);
    const [specificItem] = list.filter((item) => id === item.id);
    // console.log(specificItem);
    setTodo(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="container">
      <section className="section">
        <form className="form-container" onSubmit={onFormSubmit}>
          {alert.show ? <Alert {...alert} removeAlert={removeAlert} /> : null}
          <h1>TODO LIST</h1>
          <div className="field-container">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="form-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>

        <List
          list={list}
          clearList={clearList}
          removeTodo={removeTodo}
          editTodo={editItem}
        />
      </section>
    </div>
  );
};

export default App;
