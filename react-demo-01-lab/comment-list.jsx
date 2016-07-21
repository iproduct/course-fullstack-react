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
        let props = this.props;
        var {data, ...myTitle} = props;
        let commentNodes = data.map(
            (comment) => {
                return (
                    <Comment author={comment.author} key={comment.id} {...myTitle}>
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