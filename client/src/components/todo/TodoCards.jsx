import React from "react";
import { IoMdTrash } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({
  title,
  body,
  id,
  delid,
  display,
  updateId,
  toBeUpdate,
}) => {
  return (
    <div className="p-3 todo-card">
      <div className="content">
        <h4>{title}</h4>
        <p className="todo-card-p">
          {body.split("", 27)}
          {body.length > 27 ? "..." : ""}
        </p>
      </div>
      <div className="d-flex justify-content-around ">
        <div
          className="d-flex justify-content-center align-items-center card-icon-heading px-2 py-1"
          onClick={() => {
            display("block");
            toBeUpdate(updateId);
          }}
        >
          <GrDocumentUpdate className="card-icons" /> UPDATE
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-heading px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <IoMdTrash className="card-icons del" /> DELETE
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
