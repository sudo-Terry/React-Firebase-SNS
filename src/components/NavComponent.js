import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavComponent({icon, iconName}) {
  const [iconColor, setIconColor] = useState("#777");
  const [textColor, setTextColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("white")
  const [selected, setSelected] = useState(false);

  const onMouseOver = (event) => {
    if(!selected){
      setIconColor("#04aaff");
      setTextColor("#04aaff");
      setBackgroundColor("#04abff49");
    }
  }

  const onMouseLeave = (event) => {
    if(!selected){
      setIconColor("#777");
      setTextColor("black");
      setBackgroundColor("white");
    }
  }

  return (
    <div 
      onMouseOver={onMouseOver} 
      onMouseLeave={onMouseLeave} 
      className="navcomp-container"
    >
      <div className="navcomp-wrapper" style={{ transition: "0.2s", backgroundColor: `${backgroundColor}`}}>
        <FontAwesomeIcon className="navcomp-icons" icon={icon} color={iconColor} size="2x" fixedWidth />
        <span className="navcomp-namewrapper" style={{ transition: "0.2s", color: `${textColor} `}}>
          {iconName}
        </span>
      </div>
    </div>
  );
}

export default NavComponent;