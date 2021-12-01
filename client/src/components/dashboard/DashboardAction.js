import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div className="dash-buttons">
      <Link to="/profile" className="btn btn-light">
        <i className="fas fa-user text-normal" /> My Profile
      </Link>
      <Link to="/add-event" className="btn btn-light">
        <i className="fa fa-calendar-alt text-normal"></i> Create Events
      </Link>
      <Link to="/create-group" className="btn btn-light">
        <i class="fa fa-users text-normal"></i> Create Groups
      </Link>
    </div>
  );
};
export default DashboardAction;
