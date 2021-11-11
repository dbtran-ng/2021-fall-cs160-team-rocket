const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Event = require("../../models/Event");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Group = require("../../models/Group");

// @route  POST api/group
// @test   Create a group
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      //check("meetingMethod", "MeetingMethod is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("topic", "Topic is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newGroup = new Group({
        title: req.body.title,
        topic: req.body.topic,
        description: req.body.description,
        dateGroup: req.body.date,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const group = await newGroup.save();
      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  GET api/group
// @test   GET all groups
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find().sort({ date: -1 });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/group/:id
// @test   GET groups by groupId
// @access PUBLIC
router.get("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.ind === "ObjectId") {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/group/:id
// @test   Delete a group
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Check User
    if (group.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await group.remove();
    res.json({ msg: "Group removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
