import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { dbService } from 'myBase';
import Loader from "react-loader-spinner";
//============= 추후 Profile.js와 통합 ==============//

function OthersProfile({ match }) {
  const [otherUserObj, setOtherUserObj] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => { //db에서 유저정보 가져오기
    const { userId } = match.params;
    const userRef = await dbService.collection("users").doc(`${userId}`);
    userRef.get().then(async (doc) => {
      if (doc.exists) {
          setOtherUserObj({
            ...doc.data(),
          });
          console.log(otherUserObj);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  return (
    <div>
      <p>
        tlqkf
      </p>
    </div>
  );

}

export default OthersProfile;