const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const passport = require('passport');

// @route   POST api/comments/:id
// @desc    Add comment to post/child-comment
// @access  Private
router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newComment = new Comment({
    parentId: req.params.id,
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
    .catch(err => console.log(err));
});

// @route   POST api/comments/:commentId
// @desc    Like/unlike a comment
// @access  Private
router.post('/:commentId/like', passport.authenticate('jwt', { session: false }), (req, res) => {
  Comment.findById(req.params.commentId).then(comment => {
    const removeIndex = comment.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
    if (removeIndex > -1) {
      comment.likes.splice(removeIndex, 1);
    } else {
      comment.likes.push({ user: req.user.id })
    }
    comment.save().then(comment => {
      console.log(comment);
      res.json(comment);
    })
  })
  .catch(err => console.log(err));
})

module.exports = router;
