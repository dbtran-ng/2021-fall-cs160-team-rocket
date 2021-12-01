import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { getEvents } from '../../actions/event';
const Profile = ({
  getCurrentProfile,
  getEvents,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getEvents();
  }, [getCurrentProfile, getEvents]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="bg-light container">
      <div className="profile">
        <div>
          <img
            src={auth.user && auth.user.avatar}
            alt="avatar"
            className="round-img"
          />
          <div>
            {' '}
            <input type="file" onChange={(e) => {}} />{' '}
          </div>
        </div>
        <div>
          <h4 style={{ textTransform: 'capitalize' }}>
            {auth.user && auth.user.name}
          </h4>
          <div style={{ display: 'flex' }}>
            <h5>Major: {profile && profile.major}</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <h5>Phone: {profile && profile.phone}</h5>
          </div>
        </div>
        <div>
            <h2 className="text-primary">Hobbies</h2>
            {profile.hobbies &&
              profile.hobbies.map((hobby, index) => (
                <div key={index} className="p-1">
                  <i className="fas fa-check" /> {hobby}
                </div>
              ))}
            <h2 className="text-primary">Skill Set</h2>
            {profile.skills &&
              profile.skills.map((skill, index) => (
                <div key={index} className="p-1">
                  <i className="fas fa-check" /> {skill}
                </div>
              ))}
          </div>
      </div>

      <div className="event px-5">
        <h4>List of Events Participated</h4>
        {profile.events &&
          profile.events.map((e, index) => (
            <div key={index} className="p-1">
              <i className="fa fa-calendar-alt" /> {e.title}
            </div>
          ))}
      </div>

      <div className="buttons my-3 mx-4">
        <Link to="/edit-profile" className="btn btn-primary">
          Update
        </Link>
      </div>
    </div>
  );
};
Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  event: state.event,
});
export default connect(mapStateToProps, { getCurrentProfile, getEvents })(
  Profile
);
