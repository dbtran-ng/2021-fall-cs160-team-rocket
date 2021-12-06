import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deletePost } from '../../actions/group';

const GroupAnnouncement = ({
  groupId,
  post: { _id, text, name, picture, user, date },
  auth,
  deletePost,
}) => {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img-comment" src={picture} alt="avatar" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {formatDate(date)}</p>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => {
                deletePost(groupId, _id);
                window.location.reload(false);
              }}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

GroupAnnouncement.propTypes = {
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deletePost })(GroupAnnouncement);
