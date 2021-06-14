import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setDisplayName, setUid, setPhotoURL } from "../modules/userObj";

const AppLoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        dispatch(setDisplayName(user.displayName));
        dispatch(setUid(user.uid));
        dispatch(setPhotoURL(user.photoURL));
        //get user-bio by uid from database
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(true);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        <AppLoaderContainer>
          <Loader
            type="Oval"
            color="#3d66ba"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </AppLoaderContainer>
      )}
    </>
  );
}

export default App;
