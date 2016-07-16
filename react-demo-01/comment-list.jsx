import React from 'react';
import Comment from './comment';

let CommentList = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        author: React.PropTypes.string,
        text: React.PropTypes.string
    })),
  },
  render: function () {
    let commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
    <div className="commentList">
      {commentNodes}
    </div>
    );
  }
});

export default CommentList;