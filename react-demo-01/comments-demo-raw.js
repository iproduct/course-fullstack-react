/* jshint browser: true */

import React from "react";
import ReactDOM from "react-dom";

/**
 * CommentBox class
 */
let CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am new  CommentBox."
      )
    );
  }
});

ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('app')
);