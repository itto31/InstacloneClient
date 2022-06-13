import React from 'react'
import "./DescriptionForm.scss"
import {Form, TextArea, Button} from 'semantic-ui-react'
import {swap, useFormik }from 'formik'
import {useMutation} from "@apollo/client"
import {UPDATE_USER}from "../../../gql/user"
import * as Yup from 'yup'
import swat from "sweetalert2"

export default function DescriptionForm(props) {
    const {setShowModal, descripcion, refetch} = props;
    const [updateUser] = useMutation(UPDATE_USER)
    
    const formik = useFormik({
        initialValues: {
            description: descripcion || "",
        },
        validationSchema: Yup.object({
            description:Yup.string().required()
        }),
        onSubmit: async(formData) => {
            try {
                await updateUser({
                    variables:{
                        input: formData,
                    },
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
    });

  return (
        <Form className='description-form' onSubmit={formik.handleSubmit}>
            <TextArea placeholder='Escribe tu descripción' name="description" 
            value={formik.values.description} onChange={formik.handleChange} className={formik.errors.description && "error"}/>
            <Button type="submit" className='btn-submit'>Actualizar</Button>
        </Form>
   
  )
}
