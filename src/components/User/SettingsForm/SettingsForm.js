import React from 'react'
import "./SettingsForm.scss"
import { Button } from 'semantic-ui-react'
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router-dom';
import {useApolloClient} from "@apollo/client"
import PasswordForm from '../PasswordForm';
import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm';
import SiteWeb from '../SiteWeb';

export default function SettingsForm(props) {
  const {setShowModal, setTitleModal, setChildrenModal, getUser,refetch} = props;
  const history = useHistory();
  const client = useApolloClient();
  const {logout} = useAuth()
  const onChangePassword = () => {
   setTitleModal("Cambiar Contraseña")
   setChildrenModal(
     <PasswordForm logout={onLogout}/>)
  }
  
  const onChangeEmail = () => {
    setTitleModal("Cambiar Correo")
    setChildrenModal(
      <EmailForm correo={getUser.email} setShowModal={setShowModal}
      refetch={refetch}/>)
  };

  const onChangeDescription = () => {
    setTitleModal("Cambiar Descripción")
    setChildrenModal(
      <DescriptionForm descripcion={getUser.description} setShowModal={setShowModal}  refetch={refetch}
    />)
  }

  const onChangeSiteWeb = () => { 
    setTitleModal("Cambiar Sitio Web")
    setChildrenModal(
      <SiteWeb url={getUser.siteWeb} setShowModal={setShowModal}  refetch={refetch}
    />)
  }
  const  onLogout = () => {
    client.clearStore();
    logout();
    history.push('/');
   
  };

  return (
    <div className='settings-form'>
      <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar email</Button>
      <Button onClick={onChangeDescription}>Descripción</Button>
      <Button onClick={onChangeSiteWeb}>sitio Web</Button>
      <Button onClick={onLogout}>Cerrar sesión</Button>
      <Button onClick={ () => setShowModal(false)}>Cancelar</Button>
    </div>
  )
}
