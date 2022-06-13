import React from 'react'
import "./EmailForm.scss"
import {Form, Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user';
import swat from "sweetalert2"


export default function EmailForm(props) {
    const {correo, setShowModal, refetch} = props
    const [updateUser] = useMutation(UPDATE_USER);
   
    const formik = useFormik({
        initialValues: {
            email: correo || "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
        }),
        onSubmit:async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: formData,
                }
            });
                refetch();
                setShowModal(false)
            } catch (error) {
                swat.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                })
            }
        }
    })

  return (
   <Form className='email-form' onSubmit={formik.handleSubmit}>
        <Form.Input placeholder ="Escribe tu nuevo email" name="email"
        value = {formik.values.email}
        onChange = {formik.handleChange}
        error = {formik.errors.email && true}
        />
        <Button type="submit" className='btn-submit'>Actualizar</Button>
   </Form>
  )
}


