import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import EditProfile from "routes/EditProfile";
import Footer from "./Footer";
import Navigation from "./Navigation";
import OthersProfile from "routes/OthersProfile";
import styled from "styled-components";

const RouterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto;
`;

const RouterLeftContainer = styled.div``;
const RouterRightContainer = styled.div``;

const RouterCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RouterCenterWrapper = styled.div`
  width: 600px;
  display: flex;
  height: 100%;
  flex: 1;
  min-height: 100vh;
  justify-content: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <RouterContainer>
        <RouterLeftContainer>
          {isLoggedIn && <Navigation />}
        </RouterLeftContainer>
        <Switch>
          {isLoggedIn ? (
            <RouterCenterContainer>
              <RouterCenterWrapper>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/editprofile">
                  <EditProfile />
                </Route>
                <Route path="/profiles/:userId" component={OthersProfile} />
              </RouterCenterWrapper>
            </RouterCenterContainer>
          ) : (
            //If user is not Logged-in, Router will render Auth.js
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
        <RouterRightContainer>{isLoggedIn && <Footer />}</RouterRightContainer>
      </RouterContainer>
    </Router>
  );
};

export default AppRouter;
