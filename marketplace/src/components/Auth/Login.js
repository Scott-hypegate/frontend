import React, { useState } from 'react';
import { signInWithEmailAndPassword, auth, fetchUserData, signInWithPopup, GoogleAuthProvider } from '../../firebaseConfig';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData();
      console.log('User data:', userData);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 'auth/invalid-email':
          console.error('Invalid email address format.');
          break;
        case 'auth/user-not-found':
          console.error('User not found.');
          break;
        case 'auth/wrong-password':
          console.error('Incorrect password.');
          break;
        default:
          console.error(error);
          break;
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  

  return (
    <div className="login-form">
        <h1 className='login-title'>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-form-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-form-input"
      />
      <button onClick={handleLogin} className="login-form-button">Login</button>
      <button onClick={handleSignInWithGoogle} className="login-form-button">Sign in with Google</button>
      <Link to="/create-account" className="sign-up-link">Don't have an account? Sign up</Link>
    </div>
  );
};

export default Login;
