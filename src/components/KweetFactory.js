import React, { useState } from "react";
import { dbService, storageService } from "myBase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTimes,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FactoryContainer = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FactoryWrapper = styled.div`
  display: inline;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  padding: 4px 16px 8px;
  border-bottom: 1px solid #ddd;
`;

const FactoryProfileImgWrapper = styled.span`
  display: inline;
  width: 48px;
  height: 100%;
  padding-top: 4px;
  margin-right: 12px;
  cursor: pointer;
`;

const FactoryProfileImg = styled.img`
  width: 48px;
  height: 48px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const FactoryBody = styled.span`
  width: 500px;
  padding-top: 4px;
  display: inline;
`;

const FactoryInputWrapper = styled.div`
  width: 100%;
  height: 52px;
  padding: 12px 0px;
  padding-left: 10px;
  pointer-events: auto;
`;

const FactoryInput = styled.input`
  width: 100%;
  flex-grow: 1;
  color: black;
  font-weight: 400;
  font-size: 20px;
`;

const FactoryFileWrapper = styled.div`
  width: 100%;
`;

const FactoryImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FactoryImg = styled.img`
  overflow: hidden;
  object-fit: cover;
`;

const FactoryImgClearBtnWrapper = styled.div`
  color: #04aaff;
  cursor: pointer;
  text-align: center;
`;

const FactoryImgClearBtn = styled.span`
  margin-right: 10px;
  font-size: 12px;
`;

const FactoryPrivacyBtnWrapper = styled.div`
  width: 100%;
  height: 44px;
  padding: 0px 4px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

const FactoryPrivacyBtn = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #04aaff;
  cursor: pointer;
  border-radius: 9999px;
  padding: 6px;

  &:hover {
    background-color: #04abff49;
    transition-duration: 0.2s;
  }
`;

const FactoryFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
  margin-top: 12px;
`;

const FactoryIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FactoryIconWrapper = styled.div`
  border-radius: 9999px;
  padding: 8px;
`;

const FactoryFileInputLabel = styled.label`
  cursor: pointer;
  color: #04aaff;
`;

const FactoryFileInput = styled.input`
  opacity: 0;
  width: 0px;
  height: 0px;
`;

const FactoryKweetBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 38px;
  padding: 0 15px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  background-color: #04aaff;
  border-radius: 9999px;
  color: white;

  &:hover {
    background-color: #0e8ac9;
    transition-duration: 0.2s;
  }
`;

function KweetFactory({ userObj }) {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");

  const onSubmit = async event => {
    if (kweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const kweetObj = {
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("kweets").add(kweetObj);
    setKweet("");
    setAttachment("");
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onAttachmentClear = () => {
    setAttachment("");
  };

  const onMouseOver = event => {
    setBackgroundColor("#04abff49");
  };

  const onMouseLeave = event => {
    setBackgroundColor("white");
  };

  return (
    <FactoryContainer onSubmit={onSubmit}>
      <FactoryWrapper>
        <FactoryProfileImgWrapper>
          <FactoryProfileImg src={userObj.photoURL} alt="profile" />
        </FactoryProfileImgWrapper>
        <FactoryBody>
          <FactoryInputWrapper>
            <FactoryInput
              type="text"
              value={kweet}
              onChange={onChange}
              placeholder="무슨 일이 일어나고 있나요?"
              maxLength="120"
            />
          </FactoryInputWrapper>
          <FactoryFileWrapper>
            {attachment && (
              <FactoryImgWrapper>
                <FactoryImg
                  alt="kweet img"
                  src={attachment}
                  style={{
                    backgroundImage: attachment,
                  }}
                />
                <FactoryImgClearBtnWrapper onClick={onAttachmentClear}>
                  <FactoryImgClearBtn>Remove</FactoryImgClearBtn>
                  <FontAwesomeIcon icon={faTimes} />
                </FactoryImgClearBtnWrapper>
              </FactoryImgWrapper>
            )}
          </FactoryFileWrapper>
          <FactoryPrivacyBtnWrapper>
            <FactoryPrivacyBtn>
              <FontAwesomeIcon
                icon={faGlobeAmericas}
                size="lg"
                color="#04aaff"
              />
              &nbsp;&nbsp;모든 사람이 답글을 달 수 있습니다
            </FactoryPrivacyBtn>
          </FactoryPrivacyBtnWrapper>
          <FactoryFooter>
            <FactoryIconsWrapper
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            >
              <FactoryFileInputLabel htmlFor="factory-attach-file">
                <FactoryIconWrapper
                  style={{
                    transition: "0.2s",
                    backgroundColor: `${backgroundColor}`,
                  }}
                >
                  <FontAwesomeIcon icon={faImage} size="lg" />
                </FactoryIconWrapper>
              </FactoryFileInputLabel>
              <FactoryFileInput
                id="factory-attach-file"
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChange}
              />
            </FactoryIconsWrapper>
            <FactoryKweetBtn>
              <input type="submit" value="크윗하기" />
            </FactoryKweetBtn>
          </FactoryFooter>
        </FactoryBody>
      </FactoryWrapper>
    </FactoryContainer>
  );
}

export default KweetFactory;
