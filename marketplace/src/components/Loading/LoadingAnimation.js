import React from 'react';
import { ReactSVG } from 'react-svg';
import './LoadingAnimation.css';
import Logo from '../../assets/logo.svg';

const LoadingAnimation = () => {
  return (
    <div className="gate-container">
      <ReactSVG src={Logo} />
    </div>
  );
};

export default LoadingAnimation;
