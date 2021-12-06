import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupById, deleteGroupById } from '../../actions/group';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const GroupByMe = ({ getGroupById, deleteGroupById, group: { group }, auth, history }) => {
  const { id } = useParams();
  useEffect(() => {
    getGroupById(id);
  }, [getGroupById, id]); 


  return (
    <section className="container">
      {group === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/manage-group" className="btn backButton">
            Back To My Groups
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === group.user && (
              <Link to={`/edit-group/${group._id}`} className="btn editButton">
                Edit Group
              </Link>
            )}
          <div className="bg-light">
            <div className="event">
              <div>
                <h2>{group.title}</h2>
                <small className="post-date">
                  Created on {formatDate(group.dateCreated)}
                </small>
                <p className="mt-4">
                  <span style={{ fontStyle: 'italic' }}>Meeting Method: </span>
                  {group.meetingMethod && <span>{group.meetingMethod}</span>}
                </p>
                <p>
                  <span style={{ fontStyle: 'italic' }}>Description: </span>
                  {group.description && <span style={{ textTransform: 'uppercase'}}>{group.description}</span>}
                </p>
              </div>
            </div>
            <div className="mb-1 mx-3">
              <button
                onClick={() => {
                  deleteGroupById(id);
                  window.location.reload(false);
                  window.location.replace('http://localhost:3000/manage-group');
                  setTimeout(10000);
                }}
                type="button"
                className="btn btn-primary"
              >
                Delete this Group
              </button>
            </div>
          </div>
          <h2 className="mt-4">List of Members has joined with us</h2>
          <div className="col-6">
            {group.listOfMembers.map((member, index) => (
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
GroupByMe.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  deleteGroupById: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});
export default connect(mapStateToProps, { getGroupById, deleteGroupById })(GroupByMe);
