import React, {useState} from 'react';
import {authService} from 'myBase';

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const [error, setError] = useState("");

  const onChange = (event) => {
    const{target: {name, value}} = event;
    if(name === "email"){
      setEmail(value);
    }else if(name === "password"){
      setPassword(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      if(newAccount){
        //create account
        await authService.createUserWithEmailAndPassword(email, password);
        setNewAccount(false);
      }else{
        //sign in
        await authService.signInWithEmailAndPassword(email, password);
      }
    }catch(error){
      setError(error.message);
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          name="email" 
          required 
          onChange={onChange}
          className="authInput"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          name="password"
          required 
          onChange={onChange}
          className="authInput"
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} className="authInput authSubmit" />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
    </>
  );
}

export default AuthForm;