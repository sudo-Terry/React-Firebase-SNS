import React, { useState } from "react";
import { authService } from "myBase";
import styled from "styled-components";

const AuthFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AuthFormInput = styled.input`
  display: block;
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  background-color: #ddd;
  font-size: 12px;
  color: black;
`;

const AuthFormSubmit = styled.input`
  text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10;
  cursor: pointer;

  &:hover {
    background-color: #0e8ac9;
    transition-duration: 0.2s;
  }
`;

const AuthFormError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

const AuthFormSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
  display: block;
  font-size: 14px;

  &:hover {
    color: #0e8ac9;
    text-decoration: underline;
  }
`;

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const [error, setError] = useState("");

  const onChange = event => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      if (newAccount) {
        //create account
        await authService.createUserWithEmailAndPassword(email, password);
        setNewAccount(false);
      } else {
        //sign in
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <AuthFormContainer onSubmit={onSubmit}>
        <AuthFormInput
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          required
          onChange={onChange}
        />
        <AuthFormInput
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          required
          onChange={onChange}
        />
        <AuthFormSubmit
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <AuthFormError>{error}</AuthFormError>}
      </AuthFormContainer>
      <AuthFormSwitch onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </AuthFormSwitch>
    </>
  );
}

export default AuthForm;
