import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect, withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateEvent, getEventById } from '../../actions/event';

const EditEvent = ({
  auth,
  updateEvent,
  event: { event, loading },
  getEventById,
  history,
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    meetingMethod: '',
    description: '',
    dateEvent: '',
  });

  useEffect(() => {
    getEventById(id);
    setFormData({
      title: loading || !event.title ? '' : event.title,
      meetingMethod: loading || !event.meetingMethod ? '' : event.meetingMethod,
      description: loading || !event.description ? '' : event.description,
      dateEvent: loading || !event.dateEvent ? '' : event.dateEvent,
    });
  }, [getEventById, id, loading]);

  const { title, meetingMethod, description, dateEvent } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    updateEvent(id, formData, history);
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-normal text-decoration-underline">
          Edit Your Event
        </h1>
        <p className="lead">
          Let's bring some useful events to help communities
        </p>
        <small>* = required field</small>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <small className="form-text">Title of the Event</small>
            <input
              type="text"
              placeholder="* Title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">How are we going to meet?</small>
            <select
              name="meetingMethod"
              value={meetingMethod}
              onChange={(e) => onChange(e)}
            >
              <option value="0">* Select Method to Meet</option>
              <option value="Zoom">Zoom</option>
              <option value="GoogleMeet">Google Meet</option>
              <option value="AtSchool">At School</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <small className="form-text">
              *Give us an idea about your event
            </small>
            <textarea
              cols="30"
              rows="5"
              placeholder="* Description"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <small className="form-text">When will we meet?</small>
            <input
              type="date"
              placeholder="* Date Event"
              name="dateEvent"
              value={dateEvent}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link to="/dashboard" className="btn btn-light my-1">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

EditEvent.propTypes = {
  editEvent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { updateEvent, getEventById })(
  withRouter(EditEvent)
);
