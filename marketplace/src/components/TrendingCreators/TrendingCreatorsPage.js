import React from 'react';
import Discover from '../../components/Discover/Discover';
import './TrendingCreators.css'

const TrendingCreatorsPage = () => {
  return (
    <div className="trending-page"> 
        <div className="trending-creators-container">
            <Discover />
      </div>
    </div> 
  );
};

export default TrendingCreatorsPage;
