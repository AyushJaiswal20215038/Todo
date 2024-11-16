import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

let token = sessionStorage.getItem("jwttoken");
const Update = ({ display, update, UpdateArray }) => {
  useEffect(() => {
    // console.log("Received update:", update);
    setInputs({
      title: update.title,
      body: update.body,
    });
    // console.log(Inputs);
  }, [update]);

  const [Inputs, setInputs] = useState({
    title: update?.title || "",
    body: update?.title || "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    // console.log(token);
    await axios
      .put(
        `https://todolist-7823.onrender.com/api/v2/updateTask/${update._id}`,
        Inputs,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.message === "Update Completed") {
          UpdateArray(update._id, Inputs.title, Inputs.body);
        }
        toast.success(res.data.message);
      });
    display("none");
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update your task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        name="title"
        value={Inputs.title}
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        name="body"
        value={Inputs.body}
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          UPDATE
        </button>
        <button
          onClick={() => display("none")}
          className="btn btn-danger my-4 mx-3"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
