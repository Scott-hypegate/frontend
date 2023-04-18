import React from 'react';

const ProfileImage = ({ id, name }) => {
  return (
    <img
      src={`https://picsum.photos/200?random=${id}`}
      alt={name}
      className="profile-image"
    />
  );
};

export default ProfileImage;
