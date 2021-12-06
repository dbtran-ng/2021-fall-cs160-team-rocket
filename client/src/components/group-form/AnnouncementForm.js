import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/group';

const AnnouncementForm = ({ groupId, addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost(groupId, { text });
          setText('');
        }}
      >
        <div className="bg-primary p">
          <h3>Make an Announcement</h3>
        </div>
        <textarea
          name="text"
          cols="20"
          rows="3"
          placeholder="Add a new Announcement for the Group"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

AnnouncementForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(AnnouncementForm);
