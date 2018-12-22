import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/commentActions';

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.formAction = this.formAction.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  formAction(e) {
    e.preventDefault();
    this.props.addComment(this.props.comment._id, { text: this.state.text });
    this.setState({ text: '' });
    const replyDiv = document.getElementById(`reply-div-${this.props.comment._id}`);
    replyDiv.style.display = 'none';
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="reply-form" onSubmit={this.formAction}>
        <input type="text"
               value={this.state.text}
               name="text"
               onChange={this.onChange} />
        <input type="submit"/>
      </form>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addComment: (parentId, comment) => dispatch(addComment(parentId, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reply);
