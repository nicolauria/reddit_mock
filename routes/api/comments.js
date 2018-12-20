const express = require('express');
const router = express.Router();
const Post = require('../../models/Post')
const passport = require('passport');

// @route   POST api/comments/:id
// @desc    Add comment to post
// @access  Private
router.post('/comments/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    const newComment = {
      parentId: null,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };
    newComment.save().then(comment => {
      post.comments.unshift(comment.id);
    })
    post.save().then(post => res.json(post));
  })
  .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
});
