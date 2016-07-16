'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import data from './comments-data';

/**
 * CommentBox class
 */
let CommentBox = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        author: React.PropTypes.string,
        text: React.PropTypes.string
    })),
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data}/>
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data={data}/>,
  document.getElementById('app')
);