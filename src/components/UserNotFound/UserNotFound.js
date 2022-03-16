import React from 'react';
import "./UserNotFound.scss";
import { Link } from 'react-router-dom';
export default function UserNotFound() {
  return(

    <div className='user-not-found'>
      <p>Usuario no encontrado</p>
      <p>Es posible que el enlace que has seguido se incorrecto o que el usuario hubiera sido eliminado</p>
        <Link to='/'>Volver a Home</Link>  
  </div>
  ) 
}
