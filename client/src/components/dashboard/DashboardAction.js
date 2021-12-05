import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <Fragment>
      <h3 className="mb-5 text-center">What you can do with: </h3>
      <div id="dashboard-buttons">
        <div className="row">
          <div className="col">
            <strong>Profile</strong>
            <Link to="/profile" className="btn btn-light w-100">
              <i className="fas fa-user text-normal" /> My Profile
            </Link>
          </div>
          <div className="col">
            <strong>Events</strong>
            <Link to="/add-event" className="btn btn-light w-100">
              <i className="fa fa-calendar-alt text-normal"></i> Create Events
            </Link>
            <Link to="/manage-event" className="btn btn-light w-100">
              <i className="fa fa-calendar-alt text-normal"></i> Manage Your
              Events
            </Link>
          </div>
          <div className="col">
            <strong>Groups</strong>
            <Link to="/create-group" className="btn btn-light w-100">
              <i class="fa fa-users text-normal"></i> Create Groups
            </Link>
            <Link to="/manage-group" className="btn btn-light w-100">
              <i className="fa fa-calendar-alt text-normal"></i> Manage Your
              Groups
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default DashboardAction;
