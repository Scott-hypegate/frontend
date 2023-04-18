import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './TrendingCreators.css';
import '../CreatorCard/CreatorCard.css'
const creatorsData = [
  // Add your creators' data here
  {
    id: 1,
    name: 'Creator 1',
    bio: 'Bio for Creator 1',
  },
  {
    id: 2,
    name: 'Creator 2',
    bio: 'Bio for Creator 2',
  },
  {
    id: 3,
    name: 'Creator 3',
    bio: 'Bio for Creator 3',
  },
];

const TrendingCreators = () => {
  return (
    <div className="trending-creators-container">
      <h2 className='trending-creators-title'>Trending Creators</h2>
      <div className='trending-creators-carousel-container'>
        <Carousel
          showArrows
          infiniteLoop
          autoPlay
          showStatus={false}
          showThumbs={false}
          interval={3000}
          swipeable
          stopOnHover
        >
          {creatorsData.map((creator) => (
            <div key={creator.id} className="creator-card">
              <h3>{creator.name}</h3>
              <p>{creator.bio}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingCreators;
