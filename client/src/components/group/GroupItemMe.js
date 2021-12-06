import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
const GroupItemMe = ({
  group: {
    user: { name, avatar },
    _id,
    title,
    description,
    dateCreated,
    auth,
  },
}) => {
  return (
    <section>
      <div className="bg-white p-1 my-1">
        <div className="mx-4 my-2">
          <h4 className="my-1">{title && <span>{title}</span>}</h4>
          <p className="post-date">Posted on {formatDate(dateCreated)}</p>
          <p className="my-1">
            {" "}
            <span style={{ fontStyle: "italic" }}>Description: </span>
            {description && <span>{description}</span>}
          </p>
          <Link to={`/manage-group/${_id}`} className="btn btn-primary">
            Manage Group Details
          </Link>
        </div>
      </div>
    </section>
  );
};

GroupItemMe.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(GroupItemMe);
