import React from "react";
import styled from "styled-components";

const ModalInputContainer = styled.div`
  width: 583px;
  height: 60px;
  padding: 0px 16px;
  margin: 12px 0px;
`;

const ModalInputLabel = styled.label`
  width: 100%;
  display: flex;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 4px;
  flex-direction: row;
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
  display: flex;
  flex-direction: column;
  padding: 8px 8px 0px;
  line-height: 16px;
`;

const ModalInputTitle = styled.span`
  color: rgb(91, 112, 131);
  font-weight: 400;
  font-size: small;
  position: absolute;
  top: -0.4rem;
`;

const ModalInput = styled.input`
  cursor: auto;
  width: 100%;
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
`;

function ModalInputComponent({ title }) {
  return (
    <ModalInputContainer>
      <ModalInputLabel for={title}>
        <ModalInputWrapper>
          <ModalInputInnerWrapper>
            <ModalInputTitle>{title}</ModalInputTitle>
            <ModalInput></ModalInput>
          </ModalInputInnerWrapper>
        </ModalInputWrapper>
      </ModalInputLabel>
    </ModalInputContainer>
  );
}

export default ModalInputComponent;
