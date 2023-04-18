import React from 'react';
import {auth} from '../../firebaseConfig';
import './Auth.css';
import './Logout.css';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
