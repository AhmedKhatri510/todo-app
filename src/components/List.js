import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, clearList, removeTodo, editTodo }) => {
  console.log(editTodo);
  if (!list.length) return null;

  const renderedList = list.map((item) => {
    return (
      <div className="list-container" key={item.id}>
        <h4 className="todo">{item.title}</h4>
        <div className="btn-container ">
          <button className="icons">
            <FaEdit
              className="icon"
              style={{ color: "green" }}
              onClick={() => editTodo(item.id)}
            />
          </button>
          <button className="icons">
            <FaTrash
              className="icon"
              style={{
                color: "red",
              }}
              onClick={() => removeTodo(item.id)}
            />
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="align-center">
      <div>{renderedList}</div>
      <button className="form-btn margin-top" onClick={clearList}>
        Clear All
      </button>
    </div>
  );
};

export default List;
