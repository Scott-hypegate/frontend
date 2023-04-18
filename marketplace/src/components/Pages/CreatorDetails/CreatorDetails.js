import React from 'react';
import { useParams } from 'react-router-dom';

const CreatorDetails = ({ addToFavorites }) => {
  const { id } = useParams();

  const creator = {
    id: 1,
    name: 'John Doe',
    imageUrl: 'https://example.com/johndoe.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    niche: 'Fitness',
    isFavorite: false,
  };

  const handleAddToFavorites = () => {
    addToFavorites(creator);
    creator.isFavorite = true;
  };

  return (
    <div className="creator-details">
      <img src={creator.imageUrl} alt={creator.name} />
      <h2>{creator.name}</h2>
      <p>{creator.bio}</p>
      <p>Niche: {creator.niche}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default CreatorDetails;
