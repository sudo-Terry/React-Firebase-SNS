import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 350px;
  height: 100vh;
  margin-left: 30px;
`

const FooterSearchWrapper = styled.div``

const FooterSearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0px;
  width: 100%;
  background-color: #eee;
  border-radius: 9999px;
  padding: 12px;
`

const FooterInput = styled.input`
  width: 100%;
  margin-left: 14px;
`

const FooterContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  background-color: #eee;
  border-radius: 20px;
`

const FooterContentTitle = styled.h1`
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: bold;
`

function Footer(props) {
  return (
    <FooterContainer>
      <FooterSearchWrapper>
        <FooterSearchBox>
          <FontAwesomeIcon icon={faSearch} color={"#888"} size="lg" />
          <FooterInput 
            type="text" 
            placeholder="크위터 검색"
          />
        </FooterSearchBox>
      </FooterSearchWrapper>
      <FooterContentWrapper>
        <FooterContentTitle>내가 좋아할만한 컨텐츠</FooterContentTitle> 
      </FooterContentWrapper>  
    </FooterContainer>
  );
}

export default Footer;