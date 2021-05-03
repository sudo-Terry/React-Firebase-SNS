import React from 'react';
import NavComponent from './NavComponent';
import { NavLink } from 'react-router-dom';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEllipsisH, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser,
         faBell as farBell,
         faEnvelope as farEnvelope,
         faBookmark as farBookmark,
         faListAlt as farListAlt,
        } from '@fortawesome/free-regular-svg-icons'

function Navigation ({userObj}) {

  return (
    <nav>
      <ul className="navlist">
        <NavLink to="/" exact={true} activeStyle={{ color: "#04aaff" }}>
          <li>
            <NavComponent icon={faTwitter} iconName={"홈"} />
          </li>
        </NavLink>
        <NavLink to={`/profiles/${userObj.uid}`} exact={true} activeStyle={{ color: "#04aaff" }}>
          <li>
           <NavComponent icon={farUser} iconName={"프로필"} />
          </li>
        </NavLink>
        <li>
          <NavComponent icon={faSearch} iconName={"탐색하기"} />
        </li>
        <li>
          <NavComponent icon={farBell} iconName={"알림"} />
        </li>
        <li>
          <NavComponent icon={farEnvelope} iconName={"쪽지"} />
        </li>
        <li>
          <NavComponent icon={farBookmark} iconName={"북마크"} />
        </li>
        <li>
          <NavComponent icon={farListAlt} iconName={"리스트"} />
        </li>
        <NavLink to="/editprofile"  exact={true} activeStyle={{ color: "#04aaff" }}>
        <li>
          <NavComponent icon={faEllipsisH} iconName={"더 보기"} />
        </li>
        </NavLink>
      </ul>
      <div className="nav-kweetbtn">
        <span>크윗</span>
      </div>
    </nav>
  );
} 


export default Navigation;