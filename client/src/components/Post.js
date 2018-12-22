import React from 'react';
import { connect } from 'react-redux';
import { getComments } from '../actions/commentActions';
import Comment from './Comment';
import Reply from './Reply';

class Post extends React.Component {
  componentWillMount() {
    this.props.getComments(this.props.post._id);
  }

  render() {
    let comments = null;
    if (this.props.comments[this.props.post._id]) {
      comments = this.props.comments[this.props.post._id].map(comment => {
        return <Comment comment={comment} />
      })
    }

    let reply = null;
    if (this.props.post.open) {
      reply = <Reply comment={this.props.post} />
    }

    return (
      <div className="post">
        <div className="post-content">
          <div>
            <img className="rounded-circle"
                 src={this.props.post.avatar} />
          </div>
          <div>
            <span className="post-author">{this.props.post.name}</span>
            <p className="post-body">{this.props.post.text}</p>
          </div>
        </div>
        <div className="comments">
          {reply}<br />
          {comments}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  getComments: parentId => dispatch(getComments(parentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
