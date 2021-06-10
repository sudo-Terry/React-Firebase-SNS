import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'myBase';
import Loader from "react-loader-spinner";

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
    setUserObj({...authService.currentUser});
  };

  return (
    <>
      { init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
        ) : (
          <div className="app-loaderbox">
            <Loader
              type="Oval"
              color="#3d66ba"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
      )}
    </>
  );
}

export default App;
