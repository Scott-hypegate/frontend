import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, getAuth, doc, getDoc, setDoc, updateUserProfileInFirestore } from '../../../firebaseConfig';
import './Settings.css';

const Settings = ({ db }) => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's data from Firebase
    const getUserData = async () => {
      const user = auth.currentUser;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists) {
        setDisplayName(userDoc.data().displayName);
        setBio(userDoc.data().bio);
        setInterests(userDoc.data().interests);
      }
    };
    getUserData();
  }, [ db]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfileInFirestore(auth, displayName, bio, interests);
      setSuccess('Profile updated successfully');
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="success">
          <p>{success}</p>
        </div>
      )}
      <form className="settings-form">
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </form>
    </div>
  );
};

export default Settings;
