import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/event';

const CommentForm = ({ eventId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(eventId, { text });
          setText('');
        }}
      >
        <div className="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <textarea
          name="text"
          cols="20"
          rows="3"
          placeholder="Comment the Event"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
