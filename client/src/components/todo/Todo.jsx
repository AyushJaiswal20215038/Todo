import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import { useSelector } from "react-redux";
import axios from "axios";

const Todo = ({ changeLoad }) => {
  const [id, setId] = useState(sessionStorage.getItem("id"));
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [toUpdateArray, setToUpdateArray] = useState({ _id: "" });
  const [Inputs, setInputs] = useState({ _id: "", title: "", body: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
      return;
    }
    const token = sessionStorage.getItem("jwttoken"); // Retrieve the latest token

    if (id) {
      try {
        changeLoad(true);

        const response = await axios.post(
          "https://todolist-7823.onrender.com/api/v2/addTask",
          {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          },
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const list = response.data;
        changeLoad(false);
        // console.log(list);
        if (Array?.length > 0) {
          setArray((prevArr) => [list, ...prevArr]);
        } else {
          setArray([{ ...list }]);
        }
        setInputs({ _id: "", title: "", body: "" });
        toast.success("Your task is added");
      } catch (error) {
        changeLoad(false);
        console.error("Error adding task:", error);
        toast.error("Failed to add task");
      }
    } else {
      setArray([Inputs, ...Array]);
      setInputs({ ...Inputs, title: "", body: "" });
      toast.success("Your task is added");
      toast.error("Your task is not saved. Please Sign up!");
    }
  };

  const del = async (Cardid) => {
    const token = sessionStorage.getItem("jwttoken"); // Retrieve the latest token

    if (id) {
      try {
        changeLoad(true);
        const res = await axios.delete(
          `https://todolist-7823.onrender.com/api/v2/deleteTask/${Cardid}`,
          {
            data: { id },
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        changeLoad(false);
        toast.success(res.data.message);
        if (res.data.message === "Your Task is Deleted") {
          const newArr = Array.filter((task) => task._id !== Cardid);
          setArray([...newArr]);
        }
      } catch (error) {
        changeLoad(false);
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    } else {
      toast.error("Please Sign Up first!!");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const UpdateArray = (id, newTitle, newBody) => {
    const index = Array.findIndex((ele) => ele._id === id);
    if (index !== -1) {
      const newArr = [...Array];
      newArr[index] = {
        ...newArr[index],
        title: newTitle,
        body: newBody,
      };
      setArray(newArr);
    }
  };

  const update = (value) => {
    setToUpdateArray(Array[value]);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setArray([]);
    }
    if (id || isLoggedIn) {
      const fetchTasks = async () => {
        const token = sessionStorage.getItem("jwttoken"); // Retrieve the latest token
        try {
          const res = await axios.get(
            `https://todolist-7823.onrender.com/api/v2/getTasks/${id}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          setArray(res.data.list);
        } catch (error) {
          changeLoad(false);
          console.error("Error fetching tasks:", error);
          toast.error("Failed to fetch tasks");
        }
      };
      changeLoad(true);
      fetchTasks();
      changeLoad(false);
      // console.log(loading);
    }
  }, [id, isLoggedIn]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              placeholder="Title"
              className="p-2 my-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="Body"
              className="p-2 todo-inputs"
              name="body"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array?.length > 0 &&
                Array.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="todo-update" id="todo-update">
        <div className="container update">
          {toUpdateArray._id !== "" && (
            <Update
              display={dis}
              update={toUpdateArray}
              UpdateArray={UpdateArray}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
