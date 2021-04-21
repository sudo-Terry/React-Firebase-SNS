import React, { useEffect, useState } from 'react';
import { dbService } from 'myBase';
import Kweet from 'components/Kweet';
import KweetFactory from 'components/KweetFactory';

const Home = ({userObj}) => {
  const [kweets, setKweets] = useState([]);

  useEffect(() => {
    dbService.collection("kweets").orderBy("createdAt","desc").onSnapshot(snapshot => {
      const kweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })); 
      setKweets(kweetArray);
    })
  }, []);

  return (
    <div className="container">
       <div className="header Home_header" style={{ width: "100%", height: "53px", display: "flex" ,justifyContent: "flex-start"}}>
        <span style={{ fontSize: "20px", fontWeight: "bold", marginLeft:"10px", marginTop: "4px" }}>
          홈
        </span>
      </div>
      <KweetFactory userObj={userObj} />
      <div style={{ marginTop: 30, display:"flex", alignItems:"center", flexFlow:"column" }}>
        {kweets.map((kweet) => (
          <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  );
};

export default Home;