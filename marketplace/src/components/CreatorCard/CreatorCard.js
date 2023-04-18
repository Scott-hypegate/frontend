import React from 'react';
import './CreatorCard.css';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator, docId }) => {
  const { id, displayName, bio, interests } = creator;
  console.log("Creator:", creator, id);

  // Generate the profile picture URL using Robohash and the doc ID
  const profilePictureUrl = `https://robohash.org/${docId}?set=set4`;
  console.log(`Link to: /profile/${docId}`); // Add this console.log statement
  return (
    <Link to={`/profile/${docId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="creator-card">
        <img src={profilePictureUrl} alt={`${displayName}'s profile`} className="creator-card-image" />
        <div className="creator-card-info">
          <h2 className="creator-card-name">{displayName}</h2>
          <p className="creator-card-niche">{interests}</p>
          <p className="creator-card-niche">{bio}</p>
        </div>
      </div>
    </Link>
  );
};

export default CreatorCard;
