const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
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
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  date: {
    type: Date,
    default: Date.now
  }
});

PostSchema.pre('remove', function(next) {
    Comment.remove({ parent_id: this._id }).exec();
    next();
});

module.exports = Post = mongoose.model('posts', PostSchema);
