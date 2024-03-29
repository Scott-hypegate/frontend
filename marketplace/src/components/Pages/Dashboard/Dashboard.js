import '../../TrendingCreators/TrendingCreators.css';
import Discover from '../../Discover/Discover';
import './Dashboard.css';
import React from 'react';
import VerticalNavbarContext from '../../VerticalNavbar/VerticalNavbarContext';
import VerticalNavbar from '../../VerticalNavbar/VerticalNavbar';


function Dashboard({ user, userData, setUserData, db }) {
  if (!db) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard__content">
        <VerticalNavbarContext.Consumer>
          {({ isClosed }) => (
            <div
              className={`content-wrapper-dashboard ${
                isClosed ? 'navbar-closed' : 'navbar-open'
              }`}
            >
              <Discover db={db} />
            </div>
          )}
        </VerticalNavbarContext.Consumer>
        <VerticalNavbar user={user} />
      </div>
    </div>
  );
}

export default Dashboard;
