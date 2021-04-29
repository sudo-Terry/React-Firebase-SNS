import React, {useState} from 'react';
import {dbService, storageService} from 'myBase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

function KweetFactory({userObj}) {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white")

  const onSubmit = async (event) => {
    if (kweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = ""
    if(attachment !== ""){
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const kweetObj ={
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      creatorImg: userObj.photoURL,
      attachmentUrl,
    };
    await dbService.collection("kweets").add(kweetObj);
    setKweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const{
      target : {value}
    } = event;
    setKweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: {files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: {result},
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onAttachmentClear = () =>{
    setAttachment("");
  };

  const onMouseOver = (event) => {
    setBackgroundColor("#04abff49");
  }

  const onMouseLeave = (event) => {
    setBackgroundColor("white");
  }

  return (
    <form onSubmit={onSubmit} className="factory-form">
      <div className="factory-container">
        <span className="factory-profile">
          <img src={userObj.photoURL} alt="profile" className="factory-profimg" />
        </span>
        <span className="factory-kweet">
          <div className="factory-inputbox">
            <input 
              className="factory-input"
              type="text" 
              value={kweet} 
              onChange={onChange}
              placeholder="무슨 일이 일어나고 있나요?" 
              maxLength="120" 
            />
          </div>
          <div className="factory-attachbox">
            { attachment && ( 
              <div className="factory-attachment">
                <img 
                  alt="kweet img" 
                  src={attachment} 
                  style={{
                    backgroundImage: attachment,
                  }}
                />
                <div className="factory-attachclear" onClick={onAttachmentClear}>
                  <span>Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            )}
          </div>
          <div className="factory-kweetset">
            <span className="factory-kweetsetbtn">
              <FontAwesomeIcon icon={faGlobeAmericas} size="lg" color="#04aaff" />
              &nbsp;&nbsp;모든 사람이 답글을 달 수 있습니다
            </span>
          </div>
          <div className="factory-footer">
            <div className="factory-iconset"
              onMouseOver={onMouseOver} 
              onMouseLeave={onMouseLeave} 
            >
              <label htmlFor="factory-attach-file" className="factory-imglabel">
                <div className="factory-iconwrap" style={{ transition: "0.2s", backgroundColor: `${backgroundColor}`}}>
                  <FontAwesomeIcon icon={faImage} size="lg" />
                </div>
              </label>
              <input 
                id="factory-attach-file" 
                type="file" 
                accept="image/*" 
                multiple
                onChange={onFileChange} 
              />
            </div>
            <span className="factory-kweetbtn">
              <input type="submit" value="크윗" />
            </span>
          </div>
        </span>
      </div>
    </form>
  );
}

export default KweetFactory;