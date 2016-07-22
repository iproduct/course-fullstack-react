'use strict';

import React  from "react";
import ReactDOM from "react-dom";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import $ from 'jquery';
import SetIntervalMixin from './set-interval-mixin';

/**
 * CommentBox demo
 */

let CommentBox = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired,
        pollInterval: React.PropTypes.number.isRequired
    },
    mixins: [SetIntervalMixin],
    getInitialState: function () {
        return { data: [] };
    },
    refreshComments() {
        $.ajax({
            method: 'GET',
            url: this.props.url,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ data: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    },
    handleCommentSubmit: function(comment) {
        $.ajax({
            method: 'POST',
            url: this.props.url,
            dataType: 'json',
            data: comment,
            cache: false
        }).done((data) => {
            this.setState({ data: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    },
    componentDidMount() {
        this.setInterval( this.refreshComments, this.props.pollInterval);
    },
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // },
    render: function () {
        return (
            <div className='commentBox'>
                <h1>Comments Demo</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentsSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url='/api/comments' pollInterval={2000} />,
    document.getElementById('app')
);