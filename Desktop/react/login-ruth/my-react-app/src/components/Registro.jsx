import React, { useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../service/apirest';
import '../styles/Login.css';
import logo from '../img/delivery.png';
import { Link } from 'react-router-dom';

function Registro() {
  const [form, setForm] = useState({
    idUsuario: '',
    nombre: '',
    direccion: '',
    mail: '',
    celular: ''
  });

  function manejadorChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function ManejadorBoton(){
    let Url= Apiurl + "auth"
    axios.post(Url,form).then(response=>{
      console.log(response)
    })
    console.log(form)
  }

  function manejadorSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <br /><br />
          <img src={logo} width="100px" alt="User Icon" />
          <br /><br />
        </div>
        <form onSubmit={manejadorSubmit}>
          <input type="text" className="fadeIn second" name="idUsuario" onChange={manejadorChange} placeholder="ID de Usuario"/>
          <input type="text" className="fadeIn second" name="nombre" onChange={manejadorChange} placeholder="Nombre"/>
          <input type="text" className="fadeIn second" name="direccion" onChange={manejadorChange} placeholder="Dirección"/>
          <input type="email" className="fadeIn third" name="mail" onChange={manejadorChange} placeholder="Correo Electrónico"/>
          <input type="tel" className="fadeIn third" name="celular" onChange={manejadorChange} placeholder="Número de Teléfono"/>
          <input type="password" className="fadeIn third" name="password" onChange={manejadorChange} placeholder="Password"/>

         
          <input type="submit" className="fadeIn fourth" value="Guardar " onClick={ManejadorBoton} />
           <Link to="/">
          
            <input type="submit" className="fadeIn fourth" value="ir a Login" />
          </Link>
        </form>
        <div id="formFooter">
          <a className="underlineHover" href="#" target='_blank'>¿Quieres saber más de River?</a>
        </div>
      </div>
    </div>
  );
}

export default Registro;