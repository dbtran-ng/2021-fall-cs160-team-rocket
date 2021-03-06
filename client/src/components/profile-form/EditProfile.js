import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  name: '',
  major: '',
  yearInSchool: '',
  picture: '',
  phone: '',
  location: '',
  skills: '',
  hobbies: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  instagram: '',
};

const EditProfile = ({
  createProfile,
  profile: { profile, loading },
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    major,
    yearInSchool,
    phone,
    location,
    skills,
    hobbies,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-normal text-decoration-underline">
          Edit Your Profile
        </h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's edit some components of your
          profile
        </p>
        <small>* = required field</small>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <small className="form-text">
              Give us an idea of which year you are at school
            </small>
            <select
              name="yearInSchool"
              value={yearInSchool}
              onChange={(e) => onChange(e)}
            >
              <option value="0">* Change Year In School</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <small className="form-text">Major</small>
            <input
              type="text"
              placeholder="Edit Major"
              name="major"
              value={major}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Phone Number - Ex: 000-0000000</small>
            <input
              type="text"
              placeholder="Edit Phone Number"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Edit City & state suggested (eg. San Jose, CA)
            </small>
            <input
              type="text"
              placeholder="Edit Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Please use comma separated values (eg. Programming, Playing Video
              Games)
            </small>
            <input
              type="text"
              placeholder="* Edit Skills"
              name="skills"
              value={skills}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Please use comma separated values (eg. Swimming, Hiking)
            </small>
            <input
              type="text"
              placeholder="* Edit Hobbies"
              name="hobbies"
              value={hobbies}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Add/Edit Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link to="/dashboard" className="btn btn-light my-1">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
