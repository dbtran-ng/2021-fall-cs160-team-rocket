import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { Link } from "react-router-dom";

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 18px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img src={profile && profile.avatar} alt="avatar" className="round-img" />
        </div>
        <div>
          <h4>{user && user.name}</h4>
          <div style={{ display: "flex" }}>
            <h5>Major: {profile && profile.major}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Phone: {profile && profile.phone}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Skills: {profile && profile.skills}</h5>
          </div>
          <div style={{ display: "flex" }}>
            <h5>Hobbies: {profile && profile.hobbies}</h5>
          </div>
        </div>
      </div>

      <div className="event">
        <h4>list of event that is participated</h4>
        <h4>list of event that is participated</h4>
        <h4>list of event that is participated</h4>
        <h4>list of event that is participated</h4>
        <h4>list of event that is participated</h4>
      </div>
      <div className="buttons">
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
