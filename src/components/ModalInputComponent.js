import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalInputContainer = styled.div`
  width: 583px;
  padding: 0px 16px;
  margin: 12px 0px;
`;

const ModalInputLabel = styled.label`
  width: 100%;
  display: flex;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 4px;
  flex-direction: row;

  &:focus-within {
    border: 2px solid rgb(29, 161, 242);
  }
`;

const ModalInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  padding-top: 12px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const ModalInputInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 8px 0px;
  line-height: 16px;
`;

const ModalInputTitleByteWrapper = styled.div`
  width: 95%;
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -0.4rem;
`;

const ModalInputTitle = styled.span`
  font-weight: 400;
  font-size: small;
  color: ${({ isFocused }) =>
    isFocused ? "rgb(29, 161, 242)" : "rgb(91, 112, 131)"};
`;

const ModalInputByte = styled.span`
  color: rgb(91, 112, 131);
  font-weight: 400;
  font-size: small;
`;

const ModalInput = styled.input`
  cursor: auto;
  width: 100%;
  margin-left: 5px;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
`;

const ModalArea = styled.textarea`
  cursor: auto;
  width: 100%;
  height: 66px;
  margin-left: 5px;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border: none;
  }
`;

function ModalInputComponent({ title, defaultValue, maxByte, isArea, setter }) {
  const [nowByte, setNowByte] = useState(String(defaultValue).length);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setNowByte(value.length);
    setter(value);
  };

  return (
    <ModalInputContainer onFocus={onFocus} onBlur={onBlur}>
      <ModalInputLabel for={title}>
        <ModalInputWrapper>
          <ModalInputInnerWrapper>
            <ModalInputTitleByteWrapper>
              <ModalInputTitle isFocused={isFocused}>{title}</ModalInputTitle>
              <ModalInputByte>
                {nowByte}/{maxByte}
              </ModalInputByte>
            </ModalInputTitleByteWrapper>
            {isArea ? (
              <ModalArea
                onChange={onChange}
                value={defaultValue}
                maxLength={maxByte - 1}
              ></ModalArea>
            ) : (
              <ModalInput
                onChange={onChange}
                value={defaultValue}
                maxLength={maxByte - 1}
              ></ModalInput>
            )}
          </ModalInputInnerWrapper>
        </ModalInputWrapper>
      </ModalInputLabel>
    </ModalInputContainer>
  );
}

export default ModalInputComponent;
