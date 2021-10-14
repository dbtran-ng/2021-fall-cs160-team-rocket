const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    major: {
        type: String,
        required:true
    },
    yearInSchool: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    location: {
        type: String,
        required:true
    },
    skills: {
        type: [String],
        required: true
    },
    hobbies: {
        type: [String],
        required: true
    },
    social: {
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        linkedin:{
            type: String
        },
        instagram:{
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', ProfileSchema);