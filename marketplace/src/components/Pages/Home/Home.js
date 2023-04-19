import React from 'react';
import './Home.css';
import homepagegraphic1 from "../../../assets/homepagegraphic1.webp";
import "../../../assets/homepagegraphic1.css";
import hypegatesplash from "../../../assets/hypegatesplash.svg";
import "../../../assets/hypegatesplash.css";
import Login from '../../Auth/Login';

const Home = () => {
  return (
    <div className="home">
      <div className="content-wrapper">
        <div className="splash-login-container"> {/* Added wrapper div */}
          <img src={hypegatesplash} alt="hypegatesplash" className="hypegate-splash" />
          <Login/>
        </div>
      </div>
      <div className='imgContainer'>
        <img src={homepagegraphic1} alt="homepagegraphic1" className="homepagegraphic1" />
      </div>
    </div>
  );
};

export default Home;
