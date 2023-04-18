import React from 'react';
import './Favorites.css';
import CreatorCard from '../../../components/CreatorCard/CreatorCard';

const Favorites = ({ favorites, handleRemove }) => {
  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <ul>
          {favorites.map((creator) => (
            <li key={creator.id}>
              <CreatorCard creator={creator} docId={creator.id} />
              <button onClick={() => handleRemove(creator.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
