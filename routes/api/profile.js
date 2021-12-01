const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { response } = require('express');

// @route  GET api/profile/me
// @test   get profile based on user id
// @access Private
router.get('/me', auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if (!profile){
            return res.status(400).json({msg: 'No profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @test   create or update user profile
// @access Private
router.post('/',  
    auth,
    check('major', 'Major is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('skills', 'Skill is required').notEmpty(),
    check('hobbies', 'Hobby is required').notEmpty(),  
    async (req, res) =>{
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            major,
            yearInSchool,
            email,
            phone,
            location,
            skills,
            hobbies,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        const profileFields= {};
        profileFields.user = req.user.id;
        if (name)    profileFields.name = name;
        if (major)    profileFields.major = major;
        if (yearInSchool)    profileFields.yearInSchool = yearInSchool;
        if (email)    profileFields.email = email;
        if (phone)    profileFields.phone = phone;
        if (location)    profileFields.location = location;

        if(skills){
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        if(hobbies){
            profileFields.hobbies = hobbies.split(',').map(hobby => hobby.trim());
        }
        // Build social object
        profileFields.social = {};
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.youtube = linkedin;
        if (instagram) profileFields.social.youtube = instagram;
        
        try{
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true, setDefaultsOnInsert: true }
              );        
            return res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route  GET api/profile
// @test   get all profiles
// @access Public

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        return res.json(profiles);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route  GET api/profile/user/:user_id
// @test   get profile by user id
// @access Public

router.get('/user/:user_id', async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);
        //if no profile found
        if (!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }
        return res.json(profile);
    }catch (err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});
// @route  DELETE api/profile
// @test   delete profile
// @access Public

router.delete('/', auth, async (req,res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
        
        res.json({msg: 'User Profile Deleted'});
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;