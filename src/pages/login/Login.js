import React, { Component } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import { api } from "../../services/api";
import * as loginService from "../../services/loginService";
import store from "store/index";

import "./login.css";

// const Login = () => {
class Login extends Component {
  state = {
    defaultErrorMsg: store.getState().defaultState.errorMsgText,
    errorMsg: "",
  };

  handleSubmit = async (values) => {
    try {
      this.setState({ errorMsg: this.state.defaultErrorMsg });
      const response = await api.post("/auth", values);
      const { data } = response;
      if (data.token) {
        loginService.login(data.token, data.username);
      } else {
        this.setState({ errorMsg: "Usuário e/ou Senha não encontrado" });
      }
    } catch (err) {
      this.setState({ errorMsg: "Usuário e/ou Senha não encontrado" });
    }
  };

  validations = yup.object().shape({
    user: yup
      .string()
      .email("Usuário deve ser um e-mail valido")
      .required("Digite o Nome de Usuário"),
    pwd: yup
      .string()
      .min(8, "A Senha deve ter 8 caracteres no minimo")
      .required("Digite a Senha"),
  });

  render() {
    return (
      <div className="login-box">
        <h3>Login</h3>
        <p>Preencha os campos para continuar</p>

        {this.state.errorMsg && (
          <div className="login-error-msg">
            <h3>{this.state.errorMsg}</h3>
          </div>
        )}

        <Formik
          initialValues={{ user: "", pwd: "" }}
          onSubmit={this.handleSubmit}
          validationSchema={this.validations}
        >
          <Form className="login-form">
            <div className="login-group">
              <label htmlFor="user">Usuário</label>
              <Field
                className="login-field"
                name="user"
                placeholder="Digite o Usuario"
              />
              <ErrorMessage
                className="login-error"
                component="span"
                name="user"
              />
            </div>

            <div className="login-group">
              <label htmlFor="pwd">Senha</label>
              <Field
                type="password"
                className="login-field"
                name="pwd"
                placeholder="Digite a Senha"
              />
              <ErrorMessage
                className="login-error"
                component="span"
                name="pwd"
              />
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Login;
