import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    yearInSchool,
    location,
  },
}) => {
  return (
    <section>
      <div className="profile bg-light">
        <img src={avatar} alt="avatar" className="round-img" />
        <h2>{name}</h2>
        <p>{yearInSchool}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={"/profile/${_id)"} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </section>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
