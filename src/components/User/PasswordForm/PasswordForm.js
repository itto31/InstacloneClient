import React from 'react'
import "./PasswordForm.scss"
import { Button, Form } from 'semantic-ui-react'
import {useFormik} from "formik"
import * as Yup from 'yup';
import {useMutation} from "@apollo/client"
import { UPDATE_USER } from '../../../gql/user';
import swat from "sweetalert2"


export default function PasswordForm(props) {
    const{logout} = props;

    const [updateUser] = useMutation(UPDATE_USER);


    const formik = useFormik({
        initialValues:  initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref('repeatNewPassword')]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref('newPassword')])
        }),
       
        onSubmit: async (formData) => {   
           try {
               const result = await updateUser({
                   variables: {
                       input:{
                           currentPassword: formData.currentPassword,
                           newPassword: formData.newPassword,
                       }
                   }
               });

               if (!result.data.updateUser){
                swat.fire({
                    title: "Error",
                   text: "Error contraseña incorrecta",
                   icon: "error", 
              })
            }
              else{
                logout();
              }
               
           } catch (error) {
               swat.fire({
                     title: "Error",
                    text: "Error al actualizar la contraseña ", error,
                    icon: "error",
                    
               })
           }
        } 
    });
  return (
  <Form className='password-form' onSubmit={formik.handleSubmit}>
      <Form.Input type='password'  placeholder="Contraseña actual" name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} error={formik.errors.currentPassword && true}/>
      <Form.Input type='password' placeholder="Nueva contraseña" name="newPassword" value={formik.values.newPassword}  onChange={formik.handleChange} error={formik.errors.newPassword && true}/>
      <Form.Input type='password' placeholder="Repetir nueva contraseña" name="repeatNewPassword" value={formik.values.repeatNewPassword}  onChange={formik.handleChange} error={formik.errors.repeatNewPassword && true}/>
        <Button type='submit' className='btn-submit'>Actualizar</Button>
  </Form>
  )
}

function initialValues(){
    return {
        currentPassword:"",
        newPassword:"",
        repeatNewPassword:""
    }
}