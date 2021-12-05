import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const ProfileById = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn backButton">
            Back To Members
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn editButton">
                Edit Profile
              </Link>
            )}

          <div className="profile bg-light">
            <div>
              <img src={profile.picture} alt="avatar" className="round-img" />
              <h2>{profile.user.name}</h2>
              <p>{profile.yearInSchool}</p>
              <p className="my-1">
                {profile.location && <span>{profile.location}</span>}
              </p>
              <p className="post-date">
                Joined on {formatDate(profile.user.date)}
              </p>
            </div>
            <div>
              <h2 className="text-primary">Hobbies</h2>
              <div className="skills">
                {profile.hobbies.map((hobby, index) => (
                  <div key={index} className="p-1">
                    <i className="fas fa-check" /> {hobby}
                  </div>
                ))}
              </div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="p-1">
                    <i className="fas fa-check" /> {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="event px-5">
              <h4>Events Participated</h4>
                {profile.events &&
                  profile.events.map((e, index) => (
                    <Fragment>
                      <div key={index} className="p-1">
                        <i className="fa fa-calendar-alt" /> {e.title}
                      </div>
                    </Fragment>
                  ))}
              </div>
              <div className="event px-5">
              <h4>Groups Participated</h4>
                {profile.groups &&
                  profile.groups.map((e, index) => (
                    <Fragment>
                      <div key={index} className="p-1">
                        <i className="fa fa-dot-circle" /> {e.title}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};
ProfileById.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(ProfileById);
