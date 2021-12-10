import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import "./login.css";

const Login = ({setLoginuser}) => {
  const navigate = useNavigate();    //! usehistory instend of used nevigate new version of router
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    //   console.log(e.target);
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post("http://localhost:5000/login", user)
      .then((res) => {
        alert(res.data.message)
        setLoginuser(res.data.user);
        /* console.log(res.data.user); */
        /* navigate("/") */
      });

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login">
      {console.log(user)}
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Eneter your Email"
      />
      <br />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="eneter your pass"
      />
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={()=> navigate("/register")}>Register</div>  
    </div>
  );
};

export default Login;
