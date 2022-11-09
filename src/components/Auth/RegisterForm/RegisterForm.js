import React from "react";
import "./RegisterForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import Swal from "sweetalert2";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: yup.object({
      name: yup
        .string()
        .required("El nombre es obligatorio")
        .matches(
          /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
          "El nombre solo puede contener letras y espacios"
        ),
      username: yup
        .string()
        .matches(/^[a-zA-Z0-9-]*$/, "Nombre de usuario sin espacio")
        .required("El nombre de usuario es obligatorio"),
      email: yup
        .string()
        .email("Email no es valido")
        .required("Email no puede estar vacio"),
      password: yup
        .string()
        .required("Contraseña no puede estar vacia")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+])(?=.{8,})/,
          "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un caracter especial( !@#$%^&*+ )"
        ),
      repassword: yup
        .string()
        .required("contraseña no puede estar vacia")
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    }),
    onSubmit: async (formValue) => {
      try {
        const newUser = formValue;
        delete newUser.repassword;

        await register({
          variables: { input: newUser },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            setShowLogin(true);
          },
        });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error.message);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Regístrate para ver fotos y vídeos de tus amigos.
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y Apellidos"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={
            formik.errors.name && formik.touched.name && formik.errors.name
          }
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          onBlur={formik.handleBlur}
          error={
            formik.errors.username &&
            formik.touched.username &&
            formik.errors.username
          }
        />
        <Form.Input
          type="text"
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          error={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          error={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
        />
        <Form.Input
          type="password"
          placeholder="Repetir Contraseña"
          name="repassword"
          onChange={formik.handleChange}
          value={formik.values.repassword}
          onBlur={formik.handleBlur}
          error={
            formik.errors.repassword &&
            formik.touched.repassword &&
            formik.errors.repassword
          }
        />
        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
}

function initialValue() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  };
}
