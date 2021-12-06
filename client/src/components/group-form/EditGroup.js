import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateGroup, getGroupById } from '../../actions/group';
const EditGroup = ({ auth, updateGroup, getGroupById, history, group: { group, loading } }) => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    description: '',
  });

  useEffect(() => {
    getGroupById(id);
    setFormData({
      title: loading || !group.title ? '' : group.title,
      topic: loading || !group.topic ? '' : group.topic,
      description: loading || !group.description ? '' : group.description,
    });
  }, [getGroupById, id, loading]);

  const { title, topic, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    updateGroup(id,formData, history);
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-normal text-decoration-underline">
          Edit Your Group
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
            <input  type="text" placeholder="* Topics" name="topic" value={topic} onChange={(e) => onChange(e)} />
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

EditGroup.propTypes = {
  updateGroup: PropTypes.func.isRequired,
  getGroupById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, { updateGroup, getGroupById })(
  withRouter(EditGroup)
);
