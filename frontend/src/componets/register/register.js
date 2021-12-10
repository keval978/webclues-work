import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = () => {
const  navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    //   console.log(e.target);
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;

    if (name && email && password && password === reEnterPassword) {
      axios
        .post("http://localhost:5000/register", user)
        .then((res) => alert(res.data.message));
    } else {
      alert("Please fill the value");
    }
    setUser({
      name: "",
      email: "",
      password: "",
      reEnterPassword: "",
    });
  };

  return (
    <div className="register">
      {console.log(user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Eneter Name"
      />
      <br />
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Eneter Email"
      />
      <br />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter Pass"
      />
      <br />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        onChange={handleChange}
        placeholder="Eneter Re-Pass"
      />

      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={()=> navigate("/login")} >Login</div>
    </div>
  );
};

export default Register;
