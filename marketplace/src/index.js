import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './App.css';
import App from './App';
import Home from './components/Pages/Home/Home';
import './components/Auth/Signup.css';
import './components/Auth/CreateAccount.css';
import CreateAccount from './components/Auth/CreateAccount';
import { firebaseConfig } from './firebaseConfig';
import { FirebaseAppProvider } from 'reactfire';
import { db, auth } from './firebaseConfig';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

const Root = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} db={db}>
      <React.StrictMode>
        {user ? (
          <App location={location} firebaseConfig={firebaseConfig} db={db} user={user} />
        ) : (
          location.pathname === '/create-account' ? (
            <CreateAccount />
          ) : (
            <Home />
          )
        )}
      </React.StrictMode>
    </FirebaseAppProvider>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Root />
  </Router>
);

reportWebVitals();
