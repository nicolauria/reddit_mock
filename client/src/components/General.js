import React from 'react';
import { connect } from 'react-redux';
import { getAllPosts, createPost } from '../actions/postActions';
import Post from './Post';

class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      posts: this.props.posts
    }
    this.formAction = this.formAction.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.getAllPosts();
  }

  formAction(e) {
    e.preventDefault();
    const post = {
      text: this.state.text
    }
    this.props.createPost(post);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    let posts = <div>no posts yet</div>;

    if (this.props.posts.length > 0) {
      posts = this.props.posts.map(post => {
        return (
          <Post post={post} />
        )
      })
    }
    return (
      <div>
        <div className="general">
          <div className="posts-container">
            {posts}
          </div>
        </div>
        <div className="create-post">
        <h2>Add New Post</h2>
          <form className="new-post" onSubmit={this.formAction}>
            <input type="text"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange} />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
};

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  createPost: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(General);
