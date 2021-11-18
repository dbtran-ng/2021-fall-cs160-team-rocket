import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const EventItem = ({
  event: {
    user: { _id, name, avatar },
    id,
    title, description, dateCreated,
    auth,
  },
}) => {
  return (
    <section>
      <div className="post bg-white p-1 my-1">
        <div>
          <h4 className="my-1">{title && <span>{title}</span>}</h4>
          <p className="post-date">Posted on {(dateCreated)}</p>
          <p className="my-1">{description && <span>{description}</span>}</p>
          <Link to={`/event/${id}`} className="btn btn-primary">
            View Event Details
          </Link>
        </div>
      </div>
    </section>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(EventItem);