import React from 'react';
import { connect } from 'react-redux';
import { editComment } from '../actions/commentActions';

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      id: this.props.comment._id
    }
    this.formAction = this.formAction.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  formAction(e) {
    e.preventDefault();
    this.props.editComment({ text: this.state.text, id: this.state.id });
    this.setState({ text: '' });
    const editDiv = document.getElementById(`edit-div-${this.props.comment._id}`);
    editDiv.style.display = 'none';
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="edit-comment-form" onSubmit={this.formAction}>
        <input type="text"
               value={this.state.text}
               name="text"
               placeholder="edit comment"
               onChange={this.onChange} />
        <input type="submit"/>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editComment: comment => dispatch(editComment(comment))
});

export default connect(null, mapDispatchToProps)(EditComment);
