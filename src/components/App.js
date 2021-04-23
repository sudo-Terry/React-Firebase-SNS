import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import {authService} from 'myBase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      { init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
        ) : (
          "initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Kwitter</footer> */}
    </>
  );
}

export default App;
