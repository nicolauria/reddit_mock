const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const passport = require('passport');

// @route   POST api/comments/:post_id
// @desc    Add comment to post/child-comment
// @access  Private
router.post('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newComment = new Comment({
    parentId: req.params.post_id,
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  });
  newComment.save().then(comment => res.json(comment));
});

// @route   GET api/comments/:id
// @desc    Get child comments
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Comment.find({ parentId: req.params.id })
    .then(comments => res.json(comments))
});

module.exports = router;
