import React, {useState} from 'react';
import {dbService, storageService} from 'myBase';
import { v4 as uuidv4 } from 'uuid';

function KweetFactory({userObj}) {
  const [kweet, setKweet] = useState("");
  const [attatchment, setAttatchment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attatchmentUrl = ""
    if(attatchment !== ""){
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attatchment, "data_url");
      attatchmentUrl = await response.ref.getDownloadURL();
    }
    const kweetObj ={
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attatchmentUrl,
    };
    dbService.collection("kweets").add(kweetObj);
    setKweet("");
    setAttatchment("");
    let fileInput = document.getElementById("fileInput")
    fileInput.value = null;
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
      setAttatchment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onAttachmentClear = () =>{
    setAttatchment(null);
    let fileInput = document.getElementById("fileInput")
    fileInput.value = null;
  };


  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={kweet} onChange={onChange} placeholder="What's on your mind?" maxLength="120" />
      <input id="fileInput" type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Kweet" />
      { attatchment && ( 
        <div>
          <img src={attatchment} width="80px" />
          <button onClick={onAttachmentClear}>Clear</button>
       </div>
      )}
      </form>
  );
}

export default KweetFactory;