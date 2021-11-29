import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById, joinEvent } from '../../actions/event';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const EventById = ({ getEventById, joinEvent, event: { event }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getEventById(id);
  }, [getEventById, id]);

  return (
    <section className="container">
      {event === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/event" className="btn backButton">
            Back To Events
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === event.user._id && (
              <Link to="/edit-event" className="btn editButton">
                Edit Event
              </Link>
            )}
          <div className="bg-light">
            <div className="profile">
              <div>
                <h5>{event.user.name}</h5>
                <h2>{event.title}</h2>
                <p className="my-1">
                  {event.meetingMethod && <span>{event.meetingMethod}</span>}
                </p>
                <p className="post-date">
                  Created on {formatDate(event.dateCreated)}
                </p>
              </div>
            </div>
            <div className="mb-1 mx-3">
              <button
                onClick={() => {
                  joinEvent(id);
                  window.location.reload(false);
                }}
                type="button"
                className="btn btn-primary"
              >
                Join
              </button>
            </div>
          </div>
          <h2 className="mt-4">List of Members has joined with us</h2>
          <div className="col-6">
            {event.listMembers.map((member, index) => (
              <div
                key={index}
                className="p-1"
                style={{ textTransform: 'capitalize' }}
              >
                <i className="fas fa-check" /> {member.name}
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};
EventById.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth,
});
export default connect(mapStateToProps, { getEventById, joinEvent })(EventById);
