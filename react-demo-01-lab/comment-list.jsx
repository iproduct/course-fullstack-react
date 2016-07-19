'use strict';

import React  from "react";
import Comment from "./comment";

/**
 * CommentList component
 */

export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="commentList">
                <Comment author="John Smith">
                    Do you like *React*?
                </Comment>
                <Comment author="Brian Smith">
                    I'm considering it for next project.
                </Comment>
            </div>
        );
    }
}

CommentList.propTypes = {
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.number,
            author: React.PropTypes.string,
            text: React.PropTypes.string
        }))
}