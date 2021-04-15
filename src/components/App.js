import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import {authService} from 'myBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.gdisplayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        setIsLoggedIn(null);
      }
      setInit(true);
    });
  }, []);
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <>
      <header><h2>Kwitter</h2></header>
      { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Kwitter</footer>
    </>
  );
}

export default App;
