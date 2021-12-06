const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    ref: 'user.name'
  },
  major: {
    type: String,
    required: true,
  },
  yearInSchool: {
    type: String,
  },
  picture: {
    type: String,
    default: 'https://res.cloudinary.com/dtnzg6l1i/image/upload/v1638740334/nfokyod7n7llwdr1xvtq.jpg',
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  events: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
      },
      title: {
        type: String,
      },
    },
  ],
  groups: [
    {
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
      },
      title: {
        type: String,
      },
    },
  ],
  skills: {
    type: [String],
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
