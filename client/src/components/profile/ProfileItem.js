import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    picture,
    yearInSchool,
    location
  },
}) => {
  return (
    <section>
      <div className="profile bg-light">
        <img src={picture} alt="avatar" className="round-img" />
        <div>
          <h2>{name}</h2>
          <p>{yearInSchool}</p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
      </div>
    </section>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
