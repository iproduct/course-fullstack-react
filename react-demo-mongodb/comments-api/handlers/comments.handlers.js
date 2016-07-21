/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

const Boom = require('boom');
const assert = require('assert');
const mongodb = require('mongodb');

exports.findAll = function (request, reply) {
    this.db.collection('comments', function (err, comments_collection) {
        if (err) throw err;
        comments_collection.find({}, {}).toArray(
            (err, results) => {
                if (err) throw err;
                reply(results.map((comment) => {
                    comment.id = comment._id;
                    delete (comment._id);
                    console.log(comment);
                    return comment;
                }));
            });
    });
};

exports.find = function (request, reply) {
    this.db.collection('comments', function (err, comments_collection) {
        if (err) throw err;
        comments_collection.findOne({ _id: new mongodb.ObjectID(request.params.commentId) },
            (err, comment) => {
                if (err) throw err;
                if (comment === null) {
                    reply(Boom.notFound(`Comment with Id=${request.params.commentId} not found.`));
                } else {
                    comment.id = comment._id;
                    delete (comment._id);
                    console.log(comment);
                    reply(comment);
                }

            });
    });
};

exports.create = function (request, reply) {
    let comment = request.payload;
    // Get the documents collection
    let collection = this.db.collection('comments');
    // Insert some documents
    collection.insertOne(comment, function (err, result) {
        if (err) throw err;
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log(`Inserted 1 document into the comment collection: ${JSON.stringify(result.ops)}`);
        comment.id = result.ops[0]._id;
        const uri = request.raw.req.url + '/' + comment.id;
        console.log('Created: ', uri);
        reply(comment).created(uri);
    });
}

exports.remove = function (request, reply) {
    this.db.run('DELETE FROM comments WHERE id = ?', [request.params.commentId],
        function (err) {
            if (err) throw err;
            if (this.changes > 0) {
                console.log('Deleted: ', request.raw.req.url);
                reply(`Comment ${request.params.commentId} was deleted successfully.`);
            } else {
                reply(Boom.notFound(`Comment with Id=${request.params.commentId} not found.`));
            }
        });
};
