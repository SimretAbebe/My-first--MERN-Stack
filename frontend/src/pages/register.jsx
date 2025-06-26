import React from "react";
import "./register.css"; 
import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Form = () => {
  const navigate= useNavigate();
  const [data , setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser =  async (e) => {
    e.preventDefault()
    const {name , email , password} = data
    try {
      const {data} = await axios.post('/register' , {name, email, password})
      if(data.error){
        toast.error(data.error)
      } else{
        setData({ name: "", email: "", password: "" }); //this might be error
        toast.success("Welcome !");
        navigate('/login')
      }
    } catch(error) {
      console.log(error);
    }
  }



  return (
    <div>
      <form className="form" onSubmit={registerUser}>
        <p id="heading">Register</p>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
           
          </svg>
          <input
            autoComplete="off"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="input-field"
            type="text"
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
          >
       
          </svg>
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
          >
           
          </svg>
          <input
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input-field"
            type="password"
          />
        </div>
        <div className="btn">
          <button className="button2">Submit</button>
        </div>
    
      </form>
    </div>
  );
};

export default Form;
