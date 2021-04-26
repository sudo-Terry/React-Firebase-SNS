import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Kweet = (({kweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 크윗을 삭제하시겠습니까?");
    if(ok){
      await dbService.doc(`kweets/${kweetObj.id}`).delete();
      if(kweetObj.attachmentUrl !== "" ){
        await storageService.refFromURL(kweetObj.attachmentUrl).delete();
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev); 

  const onSubmit = async (event) =>{
    event.preventDefault();
    await dbService.doc(`kweets/${kweetObj.id}`).update({
      text: newKweet,
    });
    setEditing(false);
  }

  const onChange = (event) => {
    const {
      target: {value} 
    } = event;
    setNewKweet(value);
  }

  return (
    <div className="kweet-container">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container kweet-edit">
            <input 
              placeholder="Edit your Kweet"
              value={newKweet} 
              onChange={onChange}
              required 
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Kweet" className="kweet-updatebtn"/>
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
        </>
        ) : (
        <>
          <div className="kweet-profile">
            <img src={kweetObj.creatorImg} style={{width: "48px", height:"48px", borderRadius: "50%", display: "flex"}} />
          </div>
          <div className="kweet-body">
            <div className="kweet-nametag">
            <span className="kweet-username">{kweetObj.creatorName}</span>
            <span className="kweet-userid">@{kweetObj.creatorId}</span>
            </div>
            <p>{kweetObj.text}</p>
            {kweetObj.attachmentUrl &&
              <a href={kweetObj.attachmentUrl} target="_blank">
                <img alt="kweet img" src={kweetObj.attachmentUrl}/>
              </a>
            }
          </div>
          {isOwner && 
          <>
            <div class="kweet-actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          </>}
        </>
      )}
    </div>
  );
})

export default Kweet;