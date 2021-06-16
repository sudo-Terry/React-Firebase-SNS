import React, { useState, useEffect } from "react";
import { authService, dbService, storageService } from "myBase";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import "../styles/styles.css";
import Loader from "react-loader-spinner";
import ModalInputComponent from "./ModalInputComponent";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayName, setPhotoURL } from "../modules/userObj";

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
  height: 700px;
  display: flex;
  overflow: scroll;
  flex-direction: column;
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
`;

const ModalBackgroundLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackgroundImgWrapper = styled.div``;

const ModalImgEditIconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundLabel = styled.label``;

const BackgroundInput = styled.input`
  display: none;
`;

const ModalImgEditIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  z-index: 100;
  top: 30%;
  right: 28%;
  border-radius: 50%;
  padding: 15px 10px 15px 15px;
  cursor: pointer;

  &:hover {
    filter: brightness(80%);
    transition-duration: 0.2s;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ModalBackgroundEditIconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoURLLabel = styled.label``;

const ModalBackgroundEditIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  z-index: 100;
  top: 40%;
  right: 45%;
  border-radius: 50%;
  padding: 15px 10px 15px 15px;
  cursor: pointer;

  &:hover {
    filter: brightness(80%);
    transition-duration: 0.2s;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ModalImageInput = styled.input`
  display: none;
`;

const ModalImgWrapper = styled.div`
  overflow: hidden;
  border-radius: 50%;
  margin-left: 15px;
  position: absolute;
  top: 130px;
  border: 4px solid white;
`;

const ModalImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
`;

const ModalInputsContainer = styled.div`
  width: 583px;
  display: flex;
  margin-top: 70px;
  flex-direction: column;
`;

const ModalBirthInputWrapper = styled.div`
  height: 120px;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 16px;
`;

function ProfileEditModal({ open, close, header }) {
  const userObj = useSelector(store => store.userObjReducer);
  const dispatch = useDispatch();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [userImg, setUserImg] = useState(userObj.photoURL);
  const [userBackGround, setUserBackGround] = useState("");
  const [toggleBack, setToggleBack] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  const onBackChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUserBackGround(result);
    };
    reader.readAsDataURL(theFile);
    setToggleBack(true);
  };

  const onPhotoURLChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUserImg(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await authService.currentUser.updateProfile({
        displayName: newDisplayName,
      });
      dispatch(setDisplayName(newDisplayName));
    }
    if (userObj.photoURL !== userImg) {
      const fileRef = storageService.ref().child(`userImg/${userObj.uid}`);
      const response = await fileRef.putString(userImg, "data_url");
      const userImgUrl = await response.ref.getDownloadURL();
      await authService.currentUser.updateProfile({
        photoURL: userImgUrl,
      });
      dispatch(setPhotoURL(userImg));
    }
    if (toggleBack) {
      const fileRef = storageService
        .ref()
        .child(`userBackGround/${userObj.uid}`);
      const response = await fileRef.putString(userBackGround, "data_url");
      const userBackGroundUrl = await response.ref.getDownloadURL();
      setUserBackGround(userBackGroundUrl);
      setToggleBack(false);
    }
    await dbService
      .collection("users")
      .doc(`${userObj.uid}`)
      .set({
        uid: authService.currentUser.uid,
        displayName: authService.currentUser.displayName,
        photoURL: authService.currentUser.photoURL,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    close();
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
              <ModalSubmitBtn onClick={onSubmit}>저장</ModalSubmitBtn>
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
                  <ModalBackgroundImgWrapper>
                    <ModalBackgroundEditIconContainer>
                      <BackgroundLabel htmlFor="userBackGround-file">
                        <ModalBackgroundEditIconWrapper>
                          <FontAwesomeIcon
                            icon={faEdit}
                            color="white"
                            size="2x"
                            fixedWidth
                          />
                        </ModalBackgroundEditIconWrapper>
                      </BackgroundLabel>
                      <BackgroundInput
                        id="userBackGround-file"
                        type="file"
                        accept="image/*"
                        onChange={onBackChange}
                        style={{
                          opacity: 0,
                        }}
                      />
                    </ModalBackgroundEditIconContainer>
                    <ModalBackgroundImg
                      src={userBackGround}
                      alt="background"
                      draggable
                    />
                  </ModalBackgroundImgWrapper>
                )}
              </ModalBackgroundWrapper>
              <ModalImgWrapper>
                <ModalImg src={userImg} alt="profile" />
                <ModalImgEditIconContainer>
                  <PhotoURLLabel htmlFor="photoURL-file">
                    <ModalImgEditIconWrapper>
                      <FontAwesomeIcon
                        icon={faEdit}
                        color="white"
                        size="2x"
                        fixedWidth
                      />
                    </ModalImgEditIconWrapper>
                  </PhotoURLLabel>
                  <ModalImageInput
                    id="photoURL-file"
                    type="file"
                    accept="image/*"
                    onChange={onPhotoURLChange}
                    style={{
                      opacity: 0,
                    }}
                  />
                </ModalImgEditIconContainer>
              </ModalImgWrapper>
              <ModalInputsContainer>
                <ModalInputComponent
                  title="이름"
                  defaultValue={newDisplayName}
                  maxByte={50}
                  setter={setNewDisplayName}
                />
                <ModalInputComponent
                  title="자기소개"
                  defaultValue={"default"}
                  maxByte={160}
                  setter={setNewDisplayName}
                  isArea
                />
                <ModalInputComponent
                  title="위치"
                  defaultValue={"default"}
                  maxByte={30}
                  setter={setNewDisplayName}
                />
                <ModalInputComponent
                  title="웹사이트"
                  defaultValue={"default"}
                  maxByte={100}
                  setter={setNewDisplayName}
                />
                <ModalBirthInputWrapper>
                  생년월일 수정하는 공간
                </ModalBirthInputWrapper>
              </ModalInputsContainer>
            </ModalMainContainer>
          </ModalMain>
        </ModalSection>
      ) : null}
    </ModalContainer>
  );
}

export default ProfileEditModal;
