import React, { useEffect, useState } from "react";
import { dbService } from "myBase";
import Kweet from "components/Kweet";
import KweetFactory from "components/KweetFactory";
import { useSelector } from "react-redux";

const Home = () => {
  const [kweets, setKweets] = useState([]);
  const userObj = useSelector(store => store.userObjReducer);

  useEffect(() => {
    dbService
      .collection("kweets")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const kweetArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKweets(kweetArray);
      });
  }, []);

  return (
    <div className="container" style={{ overflow: "auto" }}>
      <div
        className="header Home_header"
        style={{
          width: "100%",
          height: "53px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: "10px",
            marginLeft: "16px",
          }}
        >
          홈
        </span>
      </div>
      <KweetFactory userObj={userObj} />
      <div
        style={{ display: "flex", alignItems: "center", flexFlow: "column" }}
      >
        {kweets.map(kweet => (
          <Kweet
            key={kweet.id}
            kweetObj={kweet}
            isOwner={kweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
