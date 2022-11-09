import React, { useState } from "react";
import "./LoginForm.scss";
import { Form, Button } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Email no es valido")
          .required("Email no puede estar vacio"),
        password: Yup.string()
          .required("Contraseña no puede estar vacia")
          .min(8, "La contraseña debe tener al menos 8 caracteres"),
      })}
      onSubmit={async (formData) => {
        try {
          const { data } = await login({
            variables: {
              input: formData,
            },
          });

          const { token } = data.login;
          setToken(token);
          setUser(decodeToken(token));
        } catch (error) {
          setError(error.message);
        }
      }}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form className="login-form" onSubmit={handleSubmit}>
          <h2>Entra para ver fotos y vídeos de tus amigos</h2>
          <Form.Input
            type="text"
            placeholder="Correo electronico"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email && touched.email && errors.email}
          />

          <Form.Input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password && touched.password && errors.password}
          />
          {error && <p className="submit-error">{error}</p>}
          <Button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
            loading={isSubmitting}>
            Iniciar sesión
          </Button>
        </Form>
      )}
    </Formik>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
