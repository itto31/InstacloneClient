import React from 'react'
import "./SiteWeb.scss"
import { Button,Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user';
import swat from "sweetalert2"


export default function SiteWeb(props) {

    const {url, setShowModal, refetch} = props
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            siteWeb: url || "",
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().url().required(),
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
    <Form className='siteWeb-form' onSubmit={formik.handleSubmit}>
        <Form.Input  placeholder='Sitio Web' name='siteWeb'
        value = {formik.values.siteWeb}
        onChange = {formik.handleChange}
        error = {formik.errors.siteWeb || true} />
        <Button className='btn-submit' type="submit" >Actualizar</Button>
    </Form>
  )
}
