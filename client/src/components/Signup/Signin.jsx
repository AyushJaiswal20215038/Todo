import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();

  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/v1/signin", Inputs)
      .then((res) => {
        if (res.data.message === "Signed In Successfully") {
          sessionStorage.setItem("id", res.data.others._id);
          sessionStorage.setItem("jwttoken", res.data.jwttoken);
          dispatch(authActions.login());
          history("/todo");
        }
        toast.error(res.data.message);
      });
  };

  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 column col-left d-lg-flex d-none justify-content-center align-items-center">
              <HeadingComp first="Sign" second="In" />
            </div>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column w-100 p-3">
                <input
                  className="p-2 my-3 input-signup"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  onChange={change}
                  value={Inputs.email}
                />
                <input
                  className="p-2 my-3 input-signup"
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                  onChange={change}
                  value={Inputs.password}
                />
                <button className="btn-signup p-2" onClick={submit}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
