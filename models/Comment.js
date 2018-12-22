const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  open: {
    type: Boolean,
    default: true
  },
  parentId: {
    type: String,
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  childComments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.pre('remove', function(next) {
    Comment.remove({ parent_id: this._id }).exec();
    next();
});

module.exports = Comment = mongoose.model('comments', CommentSchema);
