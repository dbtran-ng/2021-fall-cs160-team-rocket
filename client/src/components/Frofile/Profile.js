import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Profile = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
  }) => {
    useEffect(() => {
        getCurrentProfile();
      }, []);
    return (
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 18px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                    />
                </div>
                <div>
                    <h4>{user && user.name}</h4>
                    <div style={{display:"flex"}}>
                        <h5>Major: {profile && profile.major}</h5>
                    </div>
                    <div style={{display:"flex"}}>
                        <h5>Phone: {profile && profile.phone}</h5>
                    </div>
                    <div style={{display:"flex"}}>
                        <h5>Skill: {profile && profile.skills}</h5>
                    </div>
                    <div style={{display:"flex"}}>
                        <h5>Hobbies: {profile && profile.hobbies}</h5>
                    </div>
                </div>
            </div>

            <div className ="event">
                // create a list view component for the events 
                <h4>list of event that is participated</h4>
                <h4>list of event that is participated</h4>
                <h4>list of event that is participated</h4>
                <h4>list of event that is participated</h4>
                <h4>list of event that is participated</h4>
            </div>
            <div className="buttons">
                <Link to="/EditProfile" className="btn btn-primary">
                  Update
                </Link>
            </div>
        </div>
    )
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