const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    meetingMethod: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    date: {
        type: Date
    },
    listMembers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = Event = mongoose.model('post',EventSchema);