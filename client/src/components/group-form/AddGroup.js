import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addGroup } from "../../actions/group";
const AddGroup = ({ addGroup }) => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
  });

  const { title, topic, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addGroup(formData);
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-normal text-decoration-underline">
          Create Your OWN Group
        </h1>
        <p className="lead">Let's join together to create something big</p>
        <small>* = required field</small>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <small className="form-text">Title of the Group</small>
            <input
              type="text"
              placeholder="* Title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Choose topics that describe your group's interests
            </small>
            <input type="text" placeholder="* Topics" name="topic" value={topic} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <small className="form-text">
              Describe what your Group will be about
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
          <input type="submit" className="btn btn-primary my-1" />
          <Link to="/dashboard" className="btn btn-light my-1">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddGroup.propTypes = {
  addGroup: PropTypes.func.isRequired,
};

export default connect(null, { addGroup })(withRouter(AddGroup));
