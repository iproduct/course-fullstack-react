'use strict';

import React  from 'react';
import Remarkable from 'remarkable';

/**
 * Comment component
 */

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        let commentId = this.props.commentId;
        if (!commentId) {
            return;
        }
        // TODO: send comment delete request to the server
        this.props.onCommentDelete(commentId);
    }

    rawMarkup() {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.myTitle} {this.props.author}
                </h2>
                <span style={{ display: 'inline' }} dangerouslySetInnerHTML={this.rawMarkup() } />
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        );
    }
}

Comment.propTypes = {
    author: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    myTitle: React.PropTypes.string,
    commentId: React.PropTypes.string.isRequired,
    onCommentDelete: React.PropTypes.func
};
