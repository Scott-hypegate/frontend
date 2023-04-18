import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from '../../firebaseConfig';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      navigate('/dashboard'); // redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <h1>Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>

      <div className="social-sign-in">
        <button className="google" onClick={handleGoogleSignIn}>
          Sign Up with Google
        </button>
        <button className="facebook" onClick={handleFacebookSignIn}>
          Sign Up with Facebook
        </button>
      </div>

      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Signup;
