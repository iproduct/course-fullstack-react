'use strict';

import $ from 'jquery';

class TestService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getTests() {
        return this.getJsonAsPromise(this.url);
    }

    postTest(test) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(test),
                }).done(resolve).fail(reject);
            }
        );
    }

    handleCommentDelete(commentId) {
        // var comments = this.state.data;
        // comment.id = Date.now();
        // var newComments = comments.concat([comment]);
        // this.setState({ data: newComments });
        $.ajax({
            url: this.props.url + "/" + commentId,
            type: 'DELETE',
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}

export default TestService;