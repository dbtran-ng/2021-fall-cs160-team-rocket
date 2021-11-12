const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { post } = require('./users');
// @route  POST api/event
// @test   Create a event
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('meetingMethod', 'MeetingMethod is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newEvent = new Event({
        title: req.body.title,
        meetingMethod: req.body.meetingMethod,
        description: req.body.description,
        dateEvent: req.body.date,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route  GET api/event
// @test   GET all events
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/event/:id
// @test   GET event by eventId
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/event/:id
// @test   Delete a event
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check User
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await event.remove();
    res.json({ msg: 'event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});


// @route  POST api/event/comment/:id
// @test   Comment an event
// @access Private
router.post('/comment/:id', [
    auth,
    [check('text', 'Text is required').not().isEmpty()],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const event = await Event.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        };
  
        event.comments.unshift(newComment);
        await event.save();
        res.json(event.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    },
  ]);
  
  // @route  DELETE api/event/comments/:id/:comment_id
  // @test   Delete a comment of an event
  // @access Private
  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const comment = event.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
  
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      event.comments = event.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await event.save();
      return res.json(event.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });

module.exports = router;
