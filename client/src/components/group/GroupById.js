import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupById, joinGroup, disjoinGroup } from '../../actions/group';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import AnnouncementForm from '../group-form/AnnouncementForm';
import GroupAnnouncement from '../group/GroupAnnouncement';

const GroupById = ({
  getGroupById,
  joinGroup,
  disjoinGroup,
  group: { group },
  auth,
}) => {
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
          <Link to="/group" className="btn backButton">
            Back To Groups
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
                  <span style={{ fontStyle: 'italic' }}>Topic: </span>
                  {group.topic && <span>{group.topic}</span>}
                </p>
                <p>
                  <span style={{ fontStyle: 'italic' }}>Description: </span>
                  {group.description && (
                    <span style={{ textTransform: 'uppercase' }}>
                      {group.description}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="mb-1 mx-3">
              <button
                onClick={() => {
                  joinGroup(id);
                  window.location.reload(false);
                }}
                type="button"
                className="btn btn-primary"
              >
                Join
              </button>
              <button
                onClick={() => {
                  disjoinGroup(id);
                  window.location.reload(false);
                }}
                type="button"
                className="btn btn-primary"
              >
                Quit Join
              </button>
            </div>
          </div>
          <AnnouncementForm groupId={group._id} />
          {group.posts !== null ? (
            group.posts.map((post) => (
              <GroupAnnouncement
                key={post._id}
                post={post}
                groupId={group._id}
              />
            ))
          ) : (
            <h4>No Announcements Yet</h4>
          )}

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
GroupById.propTypes = {
  joinGroup: PropTypes.func.isRequired,
  disjoinGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getGroupById,
  joinGroup,
  disjoinGroup,
})(GroupById);
