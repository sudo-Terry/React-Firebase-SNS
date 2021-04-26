import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

function Footer(props) {
  return (
    <div className="footer-container">
      <div className="footer-searchbox">
      <FontAwesomeIcon icon={faSearch} color={"#888"} size="lg" />
        <input 
          type="text" 
          placeholder="크위터 검색"
          className="footer-search"
        />
      </div>
      <div className="footer-contentbox">
        <div className="footer-contenttitle">
          <span>내가 좋아할만한 컨텐츠</span>
        </div> 
      </div>  
    </div>
  );
}

export default Footer;