import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <div className="bg-light container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 18px',
          borderBottom: '1px solid grey',
        }}
      >
        <div>
          <img
            src={profile && profile.avatar}
            alt="avatar"
            className="round-img"
          />
        </div>
        <div>
          <h4>{user && user.name}</h4>
          <div style={{ display: 'flex' }}>
            <h5>Major: {profile && profile.major}</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <h5>Phone: {profile && profile.phone}</h5>
          </div>
          <div>
          <h2 className="text-primary">Hobbies</h2>
            {profile.hobbies.map((hobby, index) => (
              <div key={index} className="p-1">
                <i className="fas fa-check" /> {hobby}
              </div>
            ))}
          </div>
          <div>
          <h2 className="text-primary">Skill Set</h2>
            {profile.skills.map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fas fa-check" /> {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="event px-5">
        <h4>list of event that is participated</h4>
        <p>event 1</p>
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
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
