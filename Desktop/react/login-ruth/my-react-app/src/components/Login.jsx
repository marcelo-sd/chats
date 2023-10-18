import React from 'react'
//css
import '../styles/Login.css'
//imagenes
import logo from '../img/delivery.png'
//usestate

import  { useState } from 'react';
//servicios
import {Apiurl} from '../service/apirest'
//librerias
import axios from "axios"

import { Link } from 'react-router-dom';



function Login() {
 
  const [form, setForm] = useState({
    usuario: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function manejadorChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    /* console.log(form); */
  }
  function ManejadorBoton() {
    let Url = Apiurl + "auth";
    console.log("enviado");
    axios.post(Url, form)
      .then(response => {
        /* console.log(response); */
        if(response.status === 200) {
          // Suponiendo que el token se encuentra en response.data.token
          const token = response.data.token;
          // Guardar el token en localStorage
          localStorage.setItem('userToken', token);
          // Add your logic here when status is 200
        } else {
          // Handle other status codes here
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error here
      });
  }




function manejadorSubmit(e)
{
    e.preventDefault();
}


  return (
    <>
        <div className="wrapper fadeInDown">
  <div id="formContent">
   

    
    <div className="fadeIn first">
        <br /><br />
      <img src={logo} width="100px" alt="User Icon" />
      <br /><br />
    </div>

    
    <form onSubmit={manejadorSubmit}>
      <input type="text"  className="fadeIn second" name="usuario" onChange={manejadorChange} placeholder="login"/>
      <input type="password" className="fadeIn third" name="password" onChange={manejadorChange}placeholder="password"/>
      <input type="submit" className="fadeIn fourth" value="Log In" onClick={ManejadorBoton} />
      <Link  to="/registro">
      <input type="submit" className="fadeIn fourth" value="registrarse" />
      </Link>
    </form>


    <div id="formFooter">
      <a className="underlineHover" href="https://lapaginamillonaria.com/" target='_blank'>Forgot Password?</a>
    </div>

  </div>
  </div>


    </>
  )
}

export default Login



/* function ManejadorBoton() {
  let Url = Apiurl + "auth";
  console.log("enviado");
  axios.post(Url, form).then(response => {
    console.log(response);
    // Suponiendo que el token se encuentra en response.data.token
    const token = response.data.token;
    // Guardar el token en localStorage
    localStorage.setItem('userToken', token);
  });
} */



/* function ManejadorBoton(){

  let Url= Apiurl + "auth"
  console.log("enviado")
  axios.post(Url,form).then(response=>{
    console.log(response.status)
  })
  
} */




