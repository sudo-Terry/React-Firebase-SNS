import React, {useState} from 'react';
import {dbService, storageService} from 'myBase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function KweetFactory({userObj}) {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");

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
      attachmentUrl,
    };
    dbService.collection("kweets").add(kweetObj);
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


  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input 
          className="factoryInput__input"
          type="text" 
          value={kweet} 
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?" 
          maxLength="120" 
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input 
        id="attach-file" 
        type="file" 
        accept="image/*" 
        onChange={onFileChange} 
        style={{
          opacity: 0,
        }}
      />
      { attachment && ( 
        <div className="factoryForm__attachment">
          <img 
          alt="kweet img" 
          src={attachment} 
          style={{
            backgroundImage: attachment,
          }}
        />
          <div className="factoryForm__clear" onClick={onAttachmentClear}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
       </div>
      )}
      </form>
  );
}

export default KweetFactory;