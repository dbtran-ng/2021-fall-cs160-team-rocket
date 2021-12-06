import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import UploadPicture from '../profile-form/UploadPicture';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { getEvents } from '../../actions/event';
import { getGroups } from '../../actions/group';

const NAME_OF_UPLOAD_PRESET = 'insta-clone';
const YOUR_CLOUDINARY_ID = 'dtnzg6l1i';

const Profile = ({
  getCurrentProfile,
  getEvents,
  getGroups,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getEvents();
    getGroups();
  }, [getCurrentProfile, getEvents, getGroups]);

  //add profile picture
  const [formData, setFormData] = useState({
    avatar: '',
  });


  // modal popup display
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const displayModal = () => setShowModal(true);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="bg-light container">
      <div className="profile">
        <div>
          <img
            src={auth.user && profile.picture}
            alt="avatar"
            className="round-img"
          />

          <div>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Upload New Profile Picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UploadPicture></UploadPicture>
              </Modal.Body>
            </Modal>
            <button type="buttons my-3 mx-4" onClick={displayModal}>
            <i class="fa fa-upload"></i> Upload Picture
            </button>
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
      <div className="event px-5">
        <h4>List of Groups Participated</h4>
        {profile.groups &&
          profile.groups.map((e, index) => (
            <div key={index} className="p-1">
              <i className="fa fa-dot-circle" /> {e.title}
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
  group: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  event: state.event,
  group: state.group
});
export default connect(mapStateToProps, { getCurrentProfile, getEvents, getGroups })(
  Profile
);
