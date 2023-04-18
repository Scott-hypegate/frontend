import React, { useState, useEffect } from 'react';
import './Onboarding.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { createUserAndAddToFirestore, createUserWithEmailAndPassword } from '../../../firebaseConfig';

const Onboarding = ({ uid }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, [location]);



  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      const uid = user.uid;
      const userEmail = user.email; // Changed variable name here
      const displayName = user.displayName;
      const bio = user.bio;
      const interests = user.interests;
      await createUserAndAddToFirestore(userEmail, password, uid, displayName, bio, interests); // Changed variable name here
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h2>Sign Up</h2>
      </div>
      <div className="onboarding-content">
        <form onSubmit={handleSignUp}>
          <div className="form-control">
            <label htmlFor="displayName">Display Name</label>
            <input type="text" id="displayName" onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" onChange={(e) => setBio(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="interests">Interests</label>
            <input type="text" id="interests" onChange={(e) => setInterests(e.target.value)} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
