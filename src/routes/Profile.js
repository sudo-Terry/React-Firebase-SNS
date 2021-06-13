import React, { useState, useEffect } from "react";
import { dbService, storageService } from "myBase";
import Kweet from "components/Kweet";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  width: 600px;
`;

const ProfileHeader = styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #ddd;
`;

const ProfileHeaderTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const ProfileBody = styled.div`
  width: 100%;
  height: 463px;
  border-bottom: 1px solid #ddd;
`;

const ProfileUserInfo = styled.div`
  position: relative;
`;

const ProfileBackgroundWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const ProfileBackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const ProfileBackgroundLoaderWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfileBackgroundLink = styled.a``;
const ProfileImgLink = styled.a``;

const ProfileImg = styled.img`
  width: 140px;
  height: 140px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  top: 130px;
  left: 15px;

  &:hover {
    filter: brightness(70%);
    transition-duration: 0.2s;
  }
`;

const ProfileInfoWrapper = styled.div`
  width: 100%;
  height: 250px;
  padding: 12px 16px;
`;

const ProfiledEditButtonWrapper = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 4px;
  display: flex;
  justify-content: flex-end;
`;

const ProfileEditBtn = styled.span`
  width: 111px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #04aaff;
  border-radius: 9999px;
  border: 1px solid #04aaff;

  &:hover {
    transition-duration: 0.2s;
    background-color: #04abff49;
  }
`;

const ProfileDisplayName = styled.div`
  margin-top: 4px;
  margin-left: 4px;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
`;

const ProfileUid = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: gray;
`;

const ProfileKweetsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  border-left: 1px solid #ddd;
`;

function Profile({}) {
  const [myKweets, setMyKweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userBackGround, setUserBackGround] = useState("");
  const userObj = useSelector(store => store.userObjReducer);

  const getMyKweets = async () => {
    const dbRef = await dbService
      .collection("kweets")
      .where("creatorId", "==", userObj.uid);
    const kweets = await dbRef.orderBy("createdAt").get();
    setMyKweets(
      kweets.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

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
      getMyKweets();
      getUserBackGround();
    }
  }, []);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <FontAwesomeIcon
          icon={faArrowLeft}
          color={"#04aaff"}
          size="2x"
          style={{ margin: "10px", cursor: "pointer" }}
        />
        <ProfileHeaderTitle>{userObj.displayName}</ProfileHeaderTitle>
      </ProfileHeader>
      <ProfileBody>
        <ProfileUserInfo>
          <ProfileBackgroundWrapper>
            {isLoading ? (
              <ProfileBackgroundLoaderWrapper>
                <Loader
                  type="Oval"
                  color="#3d66ba"
                  height={50}
                  width={50}
                  timeout={3000} //3 secs
                />
              </ProfileBackgroundLoaderWrapper>
            ) : (
              <ProfileBackgroundLink
                href={userBackGround}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ProfileBackgroundImg
                  src={userBackGround}
                  alt="background"
                  draggable
                />
              </ProfileBackgroundLink>
            )}
          </ProfileBackgroundWrapper>
          <ProfileImgLink
            href={userObj.photoURL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ProfileImg src={userObj.photoURL} alt="profile" />
          </ProfileImgLink>
          <ProfileInfoWrapper>
            <ProfiledEditButtonWrapper>
              <ProfileEditBtn>프로필 수정</ProfileEditBtn>
            </ProfiledEditButtonWrapper>
            <ProfileDisplayName>
              {userObj.displayName}
              <ProfileUid>@{userObj.uid}</ProfileUid>
            </ProfileDisplayName>
          </ProfileInfoWrapper>
        </ProfileUserInfo>
      </ProfileBody>
      <ProfileKweetsWrapper>
        {myKweets
          .slice(0)
          .reverse()
          .map(kweet => (
            <Kweet key={kweet.id} kweetObj={kweet} isOwner={true} />
          ))}
      </ProfileKweetsWrapper>
    </ProfileContainer>
  );
}

export default Profile;
