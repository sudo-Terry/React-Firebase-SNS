import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'myBase';
import Kweet from 'components/Kweet';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from "react-loader-spinner";

function Profile({userObj}) {
  const [myKweets, setMyKweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    let userBackGroundUrl = ""
    const spaceRef = storageService.ref().child(`userBackGround/${userObj.uid}`);
    userBackGroundUrl = await spaceRef.getDownloadURL();
    setUserBackGround(userBackGroundUrl);
    setIsLoading(false);
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
            {isLoading ? (
              <div className="myprof-backloadbox">
                <Loader
                  type="Oval"
                  color="#3d66ba"
                  height={50}
                  width={50}
                  timeout={3000} //3 secs
                />
              </div>
            ) : (
              <a href={userBackGround} rel="noopener noreferrer" target="_blank">
                <img src={userBackGround} alt="background" draggable/>
              </a>
            )}
          </div>
          <a href={userObj.photoURL} rel="noopener noreferrer" target="_blank">
            <img src={userObj.photoURL} alt="profile" className="myprof-profimg" />
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
        {myKweets.slice(0).reverse().map((kweet) => (
          <Kweet key={kweet.id} kweetObj={kweet} isOwner={true}/>
        ))}
      </div>
    </div>
  );
}

export default Profile;