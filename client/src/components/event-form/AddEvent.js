import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/event';
const AddEvent = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    meetingMethod: '',
    description: '',
    dateEvent: '',
  });

  const { title, meetingMethod, description, dateEvent } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-normal text-decoration-underline">
          Create Your OWN Event
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
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              How are we going to meet?
            </small>
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
              Give us an idea about your event
            </small>
            <textarea
              cols="30"
              rows="5"
              placeholder="Description"
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
              placeholder="Date Event"
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

AddEvent.propTypes = {
  addEvent: PropTypes.func.isRequired,
};

export default connect(null, { addEvent })(withRouter(AddEvent));
