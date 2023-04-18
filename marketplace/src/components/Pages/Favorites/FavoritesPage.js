import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import Favorites from './Favorites';
import './FavoritesPage.css';

const FavoritesPage = ({ db }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (firebaseUser) {
        const userDoc = doc(db, 'users', firebaseUser.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const favoritesList = userSnapshot.data().favorites || [];
          setFavorites(favoritesList.map(id => ({ id, displayName: 'User ' + id })));
        }
      }
    };

    fetchFavorites();
  }, [firebaseUser, db]);

  const handleRemove = async (id) => {
    if (!firebaseUser) return;
    const favoritesRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(favoritesRef, {
      favorites: arrayRemove(id),
    });
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      <Favorites favorites={favorites} handleRemove={handleRemove} />
    </div>
  );
};

export default FavoritesPage;
