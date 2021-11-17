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
    dateEvent: {
        type: Date
    },
    listMembers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text:{
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        dateComment:{
            type: Date,
            default: Date.now
        }
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = Event = mongoose.model('event',EventSchema);