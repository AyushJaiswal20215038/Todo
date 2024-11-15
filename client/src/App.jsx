import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
// import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signup/Signin";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);

  // const [loading, setLoading] = useState(false);
  // let loading =false;
  const changeLoading = (loading) => {
    // console.log(loading);
    if (!loading) {
      document.getElementById("loading").style.cssText = "display : none";
    } else {
      document.getElementById("loading").style.cssText = "display : flex";
    }
    // setLoading((prevload) => prevload === false);
  };

  return (
    <div>
      <Router>
        <Navbar />
        <div id="loading">
          <p>Loading...</p>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo changeLoad={changeLoading} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
