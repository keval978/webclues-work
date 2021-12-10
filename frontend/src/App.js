import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react'
import Homepage from "./componets/homepage/homepage";
import Login from "./componets/login/login";
import Register from "./componets/register/register";

import { BrowserRouter, Routes, Route } from "react-router-dom";

  //! new version of router(v6)
function App() {
const [user,setLoginuser] = useState({})
console.log(user,"value set");

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user && user._id ?<Homepage />:<Login setLoginuser={setLoginuser}/> }></Route>
          <Route path="login" element={<Login />} setLoginuser={setLoginuser}/>
            <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
