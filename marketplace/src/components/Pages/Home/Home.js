import React from 'react';
import './Home.css';
import homepagegraphic1 from "../../../assets/homepagegraphic1.webp";
import "../../../assets/homepagegraphic1.css";
import hypegatesplash from "../../../assets/hypegatesplash.svg";
import "../../../assets/hypegatesplash.css";
import { Link } from 'react-router-dom';
import Login from '../../Auth/Login';

const Home = () => {
  return (
    <div className="home">

      <div>

        <div className="button-container">
        <img src={hypegatesplash} alt="hypegatesplash" className="hypegate-splash" />

          <Login/>
        </div>
      </div>
      <img src={homepagegraphic1} alt="homepagegraphic1" className="homepagegraphic1" />
    </div>
  );
};

export default Home;
