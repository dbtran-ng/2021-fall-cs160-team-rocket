const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  dateGroup: {
    type: Date,
  },
  listOfMembers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
      },
    },
  ],

  dateCreated: {
    type: Date,
    default: Date.now,
  },

  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      picture: {
        type: String,
      },
      dateGroup: {
        type: Date,
        default: Date.now,
      },
      comment: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = Group = mongoose.model("group", GroupSchema);
