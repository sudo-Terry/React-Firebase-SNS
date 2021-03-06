import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { dbService } from "myBase";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
//============= 추후 Profile.js와 통합 ==============//

function OthersProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [otherUserObj, setOtherUserObj] = useState({});
  const { userId } = useParams();

  const GetUserInfo = async () => {
    //db에서 유저정보 가져오기

    setIsLoading(true);
    try {
      const docRef = await dbService.collection("users").doc(`${userId}`);
      const docInfo = await docRef.get();
      setOtherUserObj(docInfo.data());
    } catch (err) {
      console.log({ err });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    GetUserInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader
          type="Oval"
          color="#3d66ba"
          height={50}
          width={50}
          timeout={3000} //3 secs
        />
      ) : (
        <Profile userObj={otherUserObj} />
      )}
    </>
  );
}

export default OthersProfile;
