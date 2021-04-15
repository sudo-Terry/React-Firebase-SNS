import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'myBase';
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
    <div>
      <KweetFactory userObj={userObj} />
      <div>
        {kweets.map((kweet) => (
          <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  );
};

export default Home;