import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import Home from "./components/Pages/Home/Home";
import LoadingAnimation from "./components/Loading/LoadingAnimation";
import VerticalNavbar from "./components/VerticalNavbar/VerticalNavbar";
import VerticalNavbarContext from "./components/VerticalNavbar/VerticalNavbarContext";
import Onboarding from "./components/Pages/Onboarding/Onboarding";
import CreateAccount from "./components/Auth/CreateAccount";
import { ErrorBoundary } from "react-error-boundary";
import Signup from "./components/Auth/Signup";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Profile from "./components/Pages/Profile/Profile";
import Settings from "./components/Pages/Settings/Settings";
import Logout from "./components/Auth/Logout";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Login from "./components/Auth/Login";
import FavoritesPage from './components/Pages/Favorites/FavoritesPage';
import Chat from './components/Pages/Messaging/Chat';
import "./App.css";




function App(current_location) {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, loadingUser] = useAuthState(auth);
  const [isClosed, setIsClosed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const location = useLocation();

  const toggleNavbar = useCallback(() => {
    setIsClosed((prevState) => !prevState);
  }, []);

  useEffect(() => {
    // Initialize firebase app
    const app = initializeApp(firebaseConfig);

    // Get firestore instance
    const firestore = getFirestore(app);
    setDb(firestore);
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user !== null && db !== null) {
          const usersCollectionRef = collection(db, "users");
          const userDocRef = doc(usersCollectionRef, user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData(null);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user !== null && db !== null) {
      fetchUserData();
    }
  }, [user, db]);

  useEffect(() => {
    if (!loadingUser) {
      setLoading(false);
    }
  }, [loadingUser]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (firebaseUser) {
        const userDoc = doc(db, 'users', firebaseUser.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const favoritesList = userSnapshot.data().favorites || [];
          setFavorites(favoritesList);
        }
      }
    };

    fetchFavorites();
  }, [firebaseUser, db]);

  const addToFavorites = async (id) => {
    if (!firebaseUser) return;
    const favoritesRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(favoritesRef, {
      favorites: arrayUnion(id),
    });
    setFavorites([...favorites, id]);
  };

  const removeFromFavorites = async (id) => {
    if (!firebaseUser) return;
    const favoritesRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(favoritesRef, {
      favorites: arrayRemove(id),
    });
    setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
  };
  return (
    <div className="App">
      {loadingUser ? (
        <LoadingAnimation />
      ) : (
        <ErrorBoundary fallback={<h1>Oops! Something went wrong.</h1>}>
          <VerticalNavbarContext.Provider value={{ isClosed, toggleNavbar, user }}>
            {location.pathname !== '/' && <VerticalNavbar location={current_location} />}
            <div style={{ marginLeft: isClosed ? "0" : "180px" }}>
              <Routes>

        <Route path="/create-account" element={
          <>
            <CreateAccount db={db} />
          </>
        } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding db={db} />} />
                <Route
                  path="/profile/:id"
                  element={<Profile userData={userData} db={db} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />}
                />
                <Route path="/favorites" element={<FavoritesPage db={db} favorites={favorites} removeFromFavorites={removeFromFavorites}/>} />

                <Route path="/settings" element={<Settings db={db} />} />
                <Route path="/dashboard" element={<Dashboard db={db} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={
                  <>
                <Home /> 
                </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/messaging" element={<Chat db={db}/>} />
                </Routes>
            </div>
          </VerticalNavbarContext.Provider>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
