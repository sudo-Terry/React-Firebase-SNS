import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'myBase';
import Kweet from 'components/Kweet';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyProfile({userObj}) {
  const [myKweets, setMyKweets] = useState([]);
  const [userBackGround, setUserBackGround] = useState("")

  useEffect(() => {
    getMyKweets();
    getUserBackGround();
  }, []);

  const getMyKweets = async () => {
    const kweets = await dbService.collection("kweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
    setMyKweets(kweets.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })));
  };

  const getUserBackGround = async () => {
    let userBackGroundUrl = ""
    const spaceRef = storageService.ref().child(`userBackGround/${userObj.uid}`);
    userBackGroundUrl = await spaceRef.getDownloadURL();
    setUserBackGround(userBackGroundUrl);
  }
  
  return (
    <div className="container myprof-container">
      <div className="header myprof-header">
        <FontAwesomeIcon icon={faArrowLeft} color={"#04aaff"} size="2x" style={{margin: "10px", cursor:"pointer"}} />
        <span>
          {userObj.displayName}
        </span>
      </div>
      <div className="myprof-body">
        <div className="myprof-bodytop">
          <div className="myprof-backimg">
            <a href={userBackGround} target="_blank">
              <img src={userBackGround} draggable/>
            </a>
          </div>
          <a href={userObj.photoURL} target="_blank">
            <img src={userObj.photoURL} className="myprof-profimg" />
          </a>
          <div className="myprof-prof">
              <div className="myprof-editprof">
                <span className="myprof-editprofbtn">
                  프로필 수정
                </span> 
              </div>
            <div className="myprof-username">
              {userObj.displayName}
              <div className="myprof-userid">
                @{userObj.uid}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="myprof-kweets">
        {myKweets.map((kweet) => (
          <Kweet key={kweet.id} kweetObj={kweet} isOwner={true}/>
        ))}
      </div>
    </div>
  );
}

export default MyProfile;