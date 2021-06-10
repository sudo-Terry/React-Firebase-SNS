import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const NavComponentContainer = styled.div`
  width: 234px;
  height: 50px;
  padding-left: 10px;
  display: flex;
  float: right;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  cursor: pointer;
`;

const NavComponentWrapper = styled.div`
  padding: 12px;
  border-radius: 9999px;
  position: relative;
`;

const NavComponentTitle = styled.span`
  transition: "0.2s";
  font-weight: bold;
  font-size: 18px;
  margin-left: 15px;
`;

function NavComponent({ icon, iconName }) {
  const [iconColor, setIconColor] = useState("#777");
  const [textColor, setTextColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("white");

  const onMouseOver = event => {
    setIconColor("#04aaff");
    setTextColor("#04aaff");
    setBackgroundColor("#04abff49");
  };

  const onMouseLeave = event => {
    setIconColor("#777");
    setTextColor("black");
    setBackgroundColor("white");
  };

  return (
    <NavComponentContainer
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <NavComponentWrapper
        style={{ transition: "0.2s", backgroundColor: `${backgroundColor}` }}
      >
        <FontAwesomeIcon
          className="navcomp-icons"
          icon={icon}
          color={iconColor}
          size="2x"
          fixedWidth
        />
        <NavComponentTitle style={{ color: `${textColor} ` }}>
          {iconName}
        </NavComponentTitle>
      </NavComponentWrapper>
    </NavComponentContainer>
  );
}

export default NavComponent;
