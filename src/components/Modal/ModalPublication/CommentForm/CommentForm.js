import React from 'react'
import "./CommentForm.scss"
import {Form, Button} from "semantic-ui-react"
import {useFormik} from "formik"
import * as Yup from "yup"
import {ADD_COMMENT} from "../../../../gql/comment"
import { useMutation } from '@apollo/client'


export default function CommentForm(props) {
    const {publication} = props;
    const [addComment] = useMutation(ADD_COMMENT);
    
    const formik = useFormik({
        initialValues: {
            comment: ""
        },
        validationSchema: Yup.object({
          comment: Yup.string().required(),
        }),
        onSubmit: async(formdata) => {
          try {
            await addComment({
              variables: {
                input: {
                  idPublication: publication.id,
                  comment:formdata.comment,
                }
              }
            })
            formik.handleReset();
          } catch (error) {
            console.log(error)
          }
        }
    })
    return (
    <Form className='comment-form' onSubmit={formik.handleSubmit}>
        <Form.Input placeholder="Añade un comentario..." name="comment"
        onChange={formik.handleChange}
        value={formik.values.comment}
        error={formik.errors.comment && true}
        />
        <Button type="submit">Publicar </Button>
        </Form>
  )
}
