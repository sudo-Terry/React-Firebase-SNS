import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

function Footer(props) {
  return (
    <div className="foot" style={{width: "350px"}}>
      <div className="footer" style={{ height: "100%", backgroundColor: "#888",  marginLeft: "30px"}}>
      <FontAwesomeIcon icon={faSearch} color={"black"} size="2x" />
        <input 
          type="text" 
          placeholder="크위터 검색"
          className="KwitterSearch"
          style = {{
            width: "100%",
            backgroundColor: "#ddd"
          }}
        />
        <h2>
          내가 좋아할만한 컨텐츠
        </h2>
      </div>
    </div>
  );
}

export default Footer;