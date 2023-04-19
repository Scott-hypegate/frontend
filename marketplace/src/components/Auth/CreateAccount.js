import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, handleCreateAccount } from '../../firebaseConfig';
import hypegatesplash from '../../assets/hypegatesplash.svg';
import '../../assets/hypegatesplash.css'
import './Signup.css';
import './CreateAccount.css';
import './Auth.css';

function CreateAccount({db}) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');


  
  

  
  


  
  

  

  
  return (
    <div className="create-account-page">
        <img src={hypegatesplash} alt="hypegatesplash" className="hypegate-splash-create" />
<form
  className="create-account-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleCreateAccount(auth, loginEmail, loginPassword, displayName, bio, interests)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        console.log("User:", user.email);

        // Redirect to dashboard
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => alert(error.message));
  }}
>
  <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Display Name"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <textarea style={{ height: "100px" }}
          placeholder="Bio goes here!"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <input style={{ height: "100px" }}
          type="text"
          placeholder="Top niches/categories separated by commas (up to 3)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>

</div>
);
};

export default CreateAccount;
