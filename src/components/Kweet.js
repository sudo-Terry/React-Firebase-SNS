import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const KweetContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid #ddd;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
    transition-duration: 0.2s;
  }
`;

const KweetEditContainer = styled.form`
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const KweetEditTextArea = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
`;

const KweetUpdateBtn = styled.input`
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 10px;
  background-color: #04aaff;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const KweetCancelBtn = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 10px;
  background-color: tomato;
  cursor: pointer;
`;

const KweetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const KweetProfileWrapper = styled.div`
  margin-right: 15px;
  padding-bottom: 15px;
`;

const KweetProfileImg = styled.img`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const KweetBody = styled.div``;

const KweetNameWrapper = styled.div``;

const KweetDisplayName = styled.span`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const KweetUid = styled.span`
  font-size: 12px;
  color: #bbb;
  margin-left: 5px;
`;

const KweetText = styled.p`
  font-size: 14px;
`;

const KweetBodyImgLink = styled.a``;

const KweetBodyImg = styled.img`
  width: 100%;
  height: 40vh;
  overflow: hidden;
  object-fit: cover;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const KweetEtcWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const KweetEtcIcon = styled.span`
  cursor: pointer;
  margin-right: 10px;
`;

const KweetFooter = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  margin-left: 63px;
  justify-content: space-between;
  align-items: center;
`;

const KweetFooterIcon = styled.div`
  margin-right: 150px;
  color: #777;
  cursor: pointer;
  border-radius: 9999px;
  padding: 5px;

  &:hover {
    transition-duration: 0.2s;
    background-color: #04abff49;
  }
`;

const Kweet = ({ kweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  const [creatorObj, setCreatorObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 크윗을 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`kweets/${kweetObj.id}`).delete();
      if (kweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(kweetObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`kweets/${kweetObj.id}`).update({
      text: newKweet,
    });
    setEditing(false);
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewKweet(value);
  };

  const getCreatorInfo = async () => {
    setIsLoading(true);
    const creatorRef = await dbService
      .collection("users")
      .doc(`${kweetObj.creatorId}`);
    creatorRef
      .get()
      .then(async doc => {
        if (doc.exists) {
          setCreatorObj({
            ...doc.data(),
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getCreatorInfo();
  }, []);

  return (
    <KweetContainer>
      {editing ? (
        <>
          <KweetEditContainer onSubmit={onSubmit}>
            <KweetEditTextArea
              placeholder="Edit your Kweet"
              value={newKweet}
              onChange={onChange}
              required
              autoFocus
            />
            <KweetUpdateBtn type="submit" value="Update Kweet" />
          </KweetEditContainer>
          <KweetCancelBtn onClick={toggleEditing}>Cancel</KweetCancelBtn>
        </>
      ) : (
        <>
          <KweetWrapper>
            {isLoading ? (
              <Loader
                type="Oval"
                color="#3d66ba"
                height={50}
                width={50}
                timeout={3000} //3 secs
              />
            ) : (
              <KweetProfileWrapper>
                <Link to={`/profiles/${creatorObj.uid}`}>
                  <KweetProfileImg src={creatorObj.photoURL} alt="profile" />
                </Link>
              </KweetProfileWrapper>
            )}
            <KweetBody>
              <KweetNameWrapper>
                <Link to={`/profiles/${creatorObj.uid}`}>
                  <KweetDisplayName>{creatorObj.displayName}</KweetDisplayName>
                </Link>
                <KweetUid>@{creatorObj.uid}</KweetUid>
              </KweetNameWrapper>
              <KweetText>{kweetObj.text}</KweetText>
              {kweetObj.attachmentUrl && (
                <KweetBodyImgLink
                  href={kweetObj.attachmentUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <KweetBodyImg alt="kweet img" src={kweetObj.attachmentUrl} />
                </KweetBodyImgLink>
              )}
            </KweetBody>
            {isOwner && (
              <KweetEtcWrapper>
                <KweetEtcIcon onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </KweetEtcIcon>
                <KweetEtcIcon onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </KweetEtcIcon>
              </KweetEtcWrapper>
            )}
          </KweetWrapper>
          <KweetFooter>
            <KweetFooterIcon>
              <FontAwesomeIcon icon={farComment} />
            </KweetFooterIcon>
            <KweetFooterIcon>
              <FontAwesomeIcon icon={faRetweet} />
            </KweetFooterIcon>
            <KweetFooterIcon>
              <FontAwesomeIcon icon={farHeart} />
            </KweetFooterIcon>
          </KweetFooter>
        </>
      )}
    </KweetContainer>
  );
};

export default Kweet;
