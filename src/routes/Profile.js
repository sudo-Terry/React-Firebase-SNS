import { authService } from 'myBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };  

  const getMyKweets = async () => {
    //const kweets = await dbService.collection("kweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
    //console.log(kweets.docs.map(doc => doc.data())); 
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyKweets();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit}  className="profileForm"> 
        <input 
          onChange={onChange} 
          autoFocus 
          type="text" 
          placeholder="Display Name" 
          value={newDisplayName}
          className="formInput" 
        />
        <input 
          type="submit" 
          value="Update Profile"  
          className="formBtn"
          style={{
            marginTop: 10,
          }} 
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;