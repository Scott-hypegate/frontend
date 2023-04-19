import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import ProfileImage from './ProfileImage';

const Profile = ({ db }) => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('db:', db); // Log the db object to make sure it is valid
  
        // Pass the document ID to the doc function
        const userDoc = doc(db, "users", id);
        console.log('userDoc:', userDoc); // Log the userDoc object to see if it's created correctly
        const userSnapshot = await getDoc(userDoc);
  
        if (userSnapshot.exists()) {
          console.log('User data:', userSnapshot.data());
          setUser(userSnapshot.data());
        } else {
          console.log('User not found:', id);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUser();
  }, [id, db]);
  

  useEffect(() => {
    const fetchFavorites = async () => {
      if (firebaseUser) {
        const userDoc = doc(db, 'users', firebaseUser.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const favoritesList = userSnapshot.data().favorites || [];
          setFavorites(favoritesList);
          setIsFavorite(favoritesList.includes(id));
        }
      }
    };

    fetchFavorites();
  }, [firebaseUser, id, db]);
  
  const addToFavorites = async () => {
    if (!firebaseUser) return;
    const favoritesRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(favoritesRef, {
      favorites: arrayUnion(id),
    });
    setFavorites([...favorites, id]);
    setIsFavorite(true); // Add this line
  };
  if (!user) {
    return <p>Loading...</p>;
  }

  const removeFromFavorites = async () => {
    if (!firebaseUser) return;
    const favoritesRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(favoritesRef, {
      favorites: arrayRemove(id),
    });
    setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    setIsFavorite(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {firebaseUser && (
          <p className="signed-in-email">Signed in as: {firebaseUser.email}</p>
        )}
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-image-container">
            <ProfileImage id={id} name={user.displayName} />
          </div>
          <h2 className="profile-name">{user.displayName}</h2>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">10</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">5k</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">500</span>
              <span className="stat-label">Following</span>
            </div>
            {firebaseUser && firebaseUser.uid !== id && (
            <>
              {isFavorite ? (
                <button className="remove-from-favorites" onClick={removeFromFavorites}>
                  Remove from Favorites
                </button>
              ) : (
                <button className="add-to-favorites" onClick={addToFavorites}>
                  Add to Favorites
                </button>
              )}
            </>
          )}
          </div>
        </div>
        <div className="gallery">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <img
                key={i}
                className="gallery"
                src={`https://picsum.photos/300/300?random=${parseInt(id) * (i + 1)}`}
                alt={`Gallery ${i + 1}`}
              />
            ))}
        </div>
      </div>
    </div>
  );

 }

export default Profile;
