'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './comment-form';
import CommentList from './comment-list';

/**
 * CommentBox class
 */
let CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
);