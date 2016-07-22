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
        var {data, ...rest} = this.props;
        let commentNodes = data.map(
            (comment) => {
                return (
                    <Comment author={comment.author} key={comment.id} {...rest}>
                        {comment.text}
                    </Comment>
                );
            })
        return (
            <div className="commentList">
                {commentNodes}
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
        })),
    myTitle: React.PropTypes.string 
}