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
      <KweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {kweets.map((kweet) => (
          <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  );
};

export default Home;