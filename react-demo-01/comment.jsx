import React from "react";
var Remarkable = require('remarkable');
let md = new Remarkable();

let Comment = React.createClass({
  propTypes: {
    author: React.PropTypes.string,
    children: React.PropTypes.any
  },
  rawMarkup: function() {
    let rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

export default Comment;
