import React from 'react';
import NavComponent from './NavComponent';
import {Link} from 'react-router-dom';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faSearch, faBell, faEnvelope, faBookmark, faListAlt, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function Navigation ({userObj}) {
  return (
    <nav>
      <ul className="navlist">
      <Link to="/" >
        <li>
          <NavComponent icon={faTwitter} iconName={"홈"} />
        </li>
        </Link>
        <Link to="/myprofile" >
          <li>
           <NavComponent icon={faUser} iconName={"프로필"} />
          </li>
        </Link>
        <li>
          <NavComponent icon={faSearch} iconName={"탐색하기"} />
        </li>
        <li>
          <NavComponent icon={faBell} iconName={"알림"} />
        </li>
        <li>
          <NavComponent icon={faEnvelope} iconName={"쪽지"} />
        </li>
        <li>
          <NavComponent icon={faBookmark} iconName={"북마크"} />
        </li>
        <li>
          <NavComponent icon={faListAlt} iconName={"리스트"} />
        </li>
        <Link to="/profile" >
        <li>
          <NavComponent icon={faEllipsisH} iconName={"더 보기"} />
        </li>
        </Link>
      </ul>
      <div className="nav-kweetbtn">
        <span>크윗</span>
      </div>
    </nav>
  );
} 


export default Navigation;