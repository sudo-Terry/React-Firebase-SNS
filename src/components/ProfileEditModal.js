import React, { useState, useEffect } from "react";
import { dbService, storageService } from "myBase";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "../styles/styles.css";
import Loader from "react-loader-spinner";
import ModalInputComponent from "./ModalInputComponent";

const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
`;

const ModalSection = styled.section`
  margin: 0 auto;
  border-radius: 16px;
  background-color: #fff;
  overflow: hidden;
  max-width: 80vw;
  max-height: 90vh;
  min-width: 600px;
  min-height: 650px;
  align-items: stretch;
`;

const ModalHeader = styled.header`
  position: relative;
  display: flex;
  height: 53px;
  padding: 6px 16px;
  background-color: #f1f1f1;
`;

const ModalCloseBtn = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;
  width: 40px;
  height: 40px;
  font-size: 40px;
  text-align: center;
  color: #04aaff;
  background-color: transparent;
  margin-right: 16px;
`;

const ModalTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const ModalSubmitWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const ModalSubmitBtn = styled.button`
  margin: auto 0;
  outline: none;
  cursor: pointer;
  border: 0;
  padding: 1px 15px;
  color: #fff;
  background-color: #04aaff;
  border-radius: 9999px;
  font-size: 15px;
  width: 60px;
  height: 32px;

  &:hover {
    background-color: #0e8ac9;
    transition-duration: 0.2s;
  }
`;

const ModalMain = styled.main`
  width: 600px;
  padding: 2px;
`;

const ModalMainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;

const ModalBackgroundWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ModalBackgroundImg = styled.img`
  width: 100%;
  height: 200px;
  overflow: hidden;
  object-fit: cover;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const ModalBackgroundLoaderWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalBackgroundLink = styled.a``;
const ModalImgLink = styled.a``;

const ModalImg = styled.img`
  width: 140px;
  height: 140px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  margin-left: 15px;
  position: absolute;
  top: 130px;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const ModalInputsContainer = styled.div`
  width: 583px;
  display: flex;
  margin-top: 70px;
  flex-direction: column;
`;

function ProfileEditModal({ open, close, header }) {
  const [userBackGround, setUserBackGround] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userObj = useSelector(store => store.userObjReducer);

  const getUserBackGround = async () => {
    setIsLoading(true);
    let userBackGroundUrl = "";
    const spaceRef = storageService
      .ref()
      .child(`userBackGround/${userObj.uid}`);
    userBackGroundUrl = await spaceRef.getDownloadURL();
    setUserBackGround(userBackGroundUrl);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userObj?.uid) {
      getUserBackGround();
    }
  }, []);

  return (
    <ModalContainer className={open ? "openModal" : ""}>
      {open ? (
        <ModalSection>
          <ModalHeader>
            <ModalCloseBtn onClick={close}> &times; </ModalCloseBtn>
            <ModalTitle>{header}</ModalTitle>
            <ModalSubmitWrapper>
              <ModalSubmitBtn onClick={close}>저장</ModalSubmitBtn>
            </ModalSubmitWrapper>
          </ModalHeader>
          <ModalMain>
            <ModalMainContainer>
              <ModalBackgroundWrapper>
                {isLoading ? (
                  <ModalBackgroundLoaderWrapper>
                    <Loader
                      type="Oval"
                      color="#3d66ba"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  </ModalBackgroundLoaderWrapper>
                ) : (
                  <ModalBackgroundLink
                    href={userBackGround}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ModalBackgroundImg
                      src={userBackGround}
                      alt="background"
                      draggable
                    />
                  </ModalBackgroundLink>
                )}
              </ModalBackgroundWrapper>
              <ModalImgLink
                href={userObj.photoURL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ModalImg src={userObj.photoURL} alt="profile" />
              </ModalImgLink>
              <ModalInputsContainer>
                <ModalInputComponent title="이름" />
                <ModalInputComponent title="자기소개" />
                <ModalInputComponent title="위치" />
                <ModalInputComponent title="웹사이트" />
                <ModalInputComponent title="웹사이트" />
                <ModalInputComponent title="웹사이트" />
              </ModalInputsContainer>
            </ModalMainContainer>
          </ModalMain>
        </ModalSection>
      ) : null}
    </ModalContainer>
  );
}

export default ProfileEditModal;
