import React from "react";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "myBase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AuthBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 320px;
`;

const AuthBtn = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background-color: #ddd;

  &:hover {
    background-color: #bbb;
  }
`;

const Auth = () => {
  const onSocialClick = async event => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <AuthContainer>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <AuthBtnWrapper>
        <AuthBtn name="google" onClick={onSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </AuthBtn>
        <AuthBtn name="github" onClick={onSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </AuthBtn>
      </AuthBtnWrapper>
    </AuthContainer>
  );
};

export default Auth;
