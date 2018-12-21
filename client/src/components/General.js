import React from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions/postActions';

class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    }
  }

  componentWillMount() {
    this.props.getAllPosts();
  }

  render() {
    let posts = <div>no posts yet</div>;

    if (this.props.posts.length > 0) {
      posts = this.props.posts.map(post => {
        return (
          <li>
            {post.text}
          </li>
        )
      })
    }
    return (
      <div>
        {posts}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(General);
