import React from 'react'
import "./SettingsForm.scss"
import { Button } from 'semantic-ui-react'
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router-dom';
import {useApolloClient} from "@apollo/client"
import PasswordForm from '../PasswordForm';

export default function SettingsForm(props) {
  const {setShowModal, setTitleModal, setChildrenModal} = props;
  const history = useHistory();
  const client = useApolloClient();
  const {logout} = useAuth()

  const onChangePassword = () => {
   setTitleModal("Cambiar Contraseña")
   setChildrenModal(
     <PasswordForm/>)
  }
  
  const  onLogout = () => {
    client.clearStore();
    logout();
    history.push('/');
   
  };

  return (
    <div className='settings-form'>
      <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripción</Button>
      <Button>sitio Web</Button>
      <Button onClick={onLogout}>Cerrar sesión</Button>
      <Button onClick={ () => setShowModal(false)}>Cancelar</Button>
    </div>
  )
}
