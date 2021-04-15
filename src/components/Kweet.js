import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';

const Kweet = (({kweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete kweet?");
    if(ok){
      await dbService.doc(`kweets/${kweetObj.id}`).delete();
      if(kweetObj.attachmentUrl !== "" ){
        await storageService.refFromURL(kweetObj.attatchmentUrl).delete();
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
    <div>
      {
        editing ? (
          <>
          <form onSubmit={onSubmit}>
            <input 
              placeholder="Edit your Kweet"
              value={newKweet} 
              onChange={onChange}
              required 
            />
            <input type="submit" value="Update Kweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
        ) : (
        <>
          <h4>{kweetObj.text}</h4>
          {kweetObj.attatchmentUrl &&
            <img src={kweetObj.attatchmentUrl} width="80px" />
          }
          {isOwner && 
          <>
            <button onClick={onDeleteClick}>Delete Kweet</button>
            <button onClick={toggleEditing}>Edit Kweet</button>
          </>}
        </>
      )}
    </div>
  );
})

export default Kweet;