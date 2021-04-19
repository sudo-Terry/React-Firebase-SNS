import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Kweet = (({kweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete kweet?");
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
    <div className="kweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container kweetEdit">
            <input 
              placeholder="Edit your Kweet"
              value={newKweet} 
              onChange={onChange}
              required 
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Kweet" className="formBtn"/>
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
        </>
        ) : (
        <>
          <h4>{kweetObj.text}</h4>
          {kweetObj.attachmentUrl &&
            <img alt="kweet img" src={kweetObj.attachmentUrl}/>
          }
          {isOwner && 
          <>
            <div class="kweet__actions">
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