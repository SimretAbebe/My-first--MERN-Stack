import React from 'react'
import { useState } from 'react';
import './login.css'; 
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const login = () => {
  const  navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser =  async (e) => {
    e.preventDefault()
    const {email, password } =data
    try{
      const {data} =await axios.post('/login' , {
        email,
        password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({ email: "", password: "" }); //this might be an error
        toast.success("Login successful!");
        navigate('/Dashboard')
      }
    }catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

 
  return (
    <div>
      <form onSubmit={loginUser} className='form-container'>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          ></svg>
          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="input-field"
            type="email"
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          ></svg>
          <input
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input-field"
            type="password"
          />
        </div>
        <div className="btn">
          <button className="button1">Login</button>
        </div>
      </form>
    </div>
  );
}

export default login