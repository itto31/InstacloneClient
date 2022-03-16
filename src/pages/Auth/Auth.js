import React ,{ useState} from 'react';
import {Container, Image} from 'semantic-ui-react';
import instaclone from '../../assets//png/instaclone.png';
import RegisterForm from '../../components/Auth/RegisterForm';
import "./Auth.scss";
import LoginForm from '../../components/Auth/LoginForm';

export default function Auth() {
    const[showLogin, setShowLogin] = useState(true);
  return ( 
    <Container fluid className='auth'>  
        <Image src={instaclone}/>

        <div className='container-form'>   
        {showLogin? <LoginForm/> : <RegisterForm setShowLogin={setShowLogin}/>}
        </div>

        <div className='change-form'>
            <p>
            {showLogin ?(
                <>
                 ¿No tienes cuenta?
                 <span onClick={ () => setShowLogin(!showLogin)}> Regístrate</span>
                </>
            ) : (
                <>
                ¡entra con tu cuenta!
                <span onClick={ () => setShowLogin(!showLogin)}> Iniciar sesión</span>
                </>
            )}
            </p>
        </div>
    </Container>

  )
}
