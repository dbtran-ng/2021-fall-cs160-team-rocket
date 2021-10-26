import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div className="dash-buttons">
      <Link to="/create-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-normal"></i> Create Profile
      </Link>
    </div>
  );
};
export default DashboardAction
