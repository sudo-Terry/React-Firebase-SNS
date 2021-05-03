import { dbService, storageService } from 'myBase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faComment as farComment } from '@fortawesome/free-regular-svg-icons'
import Loader from "react-loader-spinner";

const Kweet = (({kweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  const [creatorObj, setCreatorObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
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

  const getCreatorInfo = async () => {
    setIsLoading(true);
    const creatorRef = await dbService.collection("users").doc(`${kweetObj.creatorId}`);
    creatorRef.get().then(async (doc) => {
      if (doc.exists) {
          setCreatorObj({
            ...doc.data(),
          });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getCreatorInfo();
  }, []);

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
          <div className="kweet-header">
            {isLoading ? (
                <Loader
                  type="Oval"
                  color="#3d66ba"
                  height={50}
                  width={50}
                  timeout={3000} //3 secs
                />
            ) : (
              <div className="kweet-profile">
                <Link to={`/${creatorObj.uid}`} >
                  <img src={creatorObj.photoURL} alt="profile" style={{width: "48px", height:"48px", borderRadius: "50%", display: "flex"}} />
                </Link>
              </div>
            )}
            <div className="kweet-body">
              <div className="kweet-nametag">
                <Link to={`/profiles/${creatorObj.uid}`} >
                  <span className="kweet-username">{creatorObj.displayName}</span>
                </Link>
                <span className="kweet-userid">@{creatorObj.uid}</span>
              </div>
              <p>{kweetObj.text}</p>
              {kweetObj.attachmentUrl &&
                <a href={kweetObj.attachmentUrl} rel="noopener noreferrer" target="_blank">
                  <img alt="kweet img" src={kweetObj.attachmentUrl}/>
                </a>
              }
            </div>
            {isOwner && 
            <div className="kweet-actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
            }
          </div>
          <div className="kweet-footer">
            <span className="kweet-footiconwrap">
              <FontAwesomeIcon icon={farComment} />
            </span>
            <span className="kweet-footiconwrap">
              <FontAwesomeIcon icon={faRetweet} />
            </span>
            <span className="kweet-footiconwrap">
              <FontAwesomeIcon icon={farHeart} />
            </span>
          </div>
        </>
      )}
    </div>
  );
})

export default Kweet;