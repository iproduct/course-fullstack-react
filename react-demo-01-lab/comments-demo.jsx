'use strict';

import React  from "react";
import ReactDOM from "react-dom";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import data from './comments-data';

/**
 * CommentBox demo
 */

let CommentBox = React.createClass({
    render: function() {
        return (
            <div className='commentBox'>
               <h1>Comments Demo</h1>
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