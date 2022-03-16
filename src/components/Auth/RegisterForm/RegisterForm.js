import React from 'react';
import "./RegisterForm.scss";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useMutation} from "@apollo/client"
import {REGISTER} from "../../../gql/user"
import Swal from 'sweetalert2'

export default function RegisterForm(props) {
    const {setShowLogin} = props;
    const [register] = useMutation(REGISTER);
    
    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: yup.object({
           name: yup.string().required("true"), 
           username: yup.string().matches(/^[a-zA-Z0-9-]*$/,"Nombre de usuario sin espacio").required("true"),
            email: yup.string().email().required("Email no es valido"),
            password: yup.string().required("Contraseña no puede estar vacia").oneOf([yup.ref("repassword")], "Las contraseñas no coinciden").min(6, "La contraseña debe tener al menos 6 caracteres"),
            repassword: yup.string().required("contraseña no puede estar vacia").oneOf([yup.ref("password")], "Las contraseñas no coinciden").min(6, "La contraseña debe tener al menos 6 caracteres"),
        }),
        onSubmit: async (formValue) =>{
           try {
               const newUser = formValue;
               delete newUser.repassword;
              
                await register({
                   variables: 
                   {input: newUser}
                });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registro exitoso',
                    showConfirmButton: false,
                    timer: 1500,
                    didClose: () => {
                        setShowLogin(true);
                    }
                })
           } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
              })
               console.log(error.message)
           }
        }
    });

      return(
    <>
    <h2 className='register-form-title'>
        Regístrate para ver fotos y vídeos de tus amigos.
        </h2>
        <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input type='text' placeholder='Nombre y Apellidos' name='name' onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name && true}/>
        <Form.Input type='text' placeholder='Nombre de usuario' name='username'onChange={formik.handleChange} value={formik.values.username} error={formik.errors.username && true}/>
        <Form.Input type='text' placeholder='Correo electronico' name='email' onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email && true}/>
        <Form.Input type='password' placeholder='Contraseña' name='password' onChange={formik.handleChange}value={formik.values.password} error={formik.errors.password && true}/>
        <Form.Input type='password' placeholder='Repetir Contraseña' name='repassword' onChange={formik.handleChange}value={formik.values.repassword} error={formik.errors.repassword && true}/>
        <Button type="submit" className='btn-submit'  >Registrarse</Button>
        </Form>
    </>
  );
}

function initialValue(){
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repassword: "",
    };
}