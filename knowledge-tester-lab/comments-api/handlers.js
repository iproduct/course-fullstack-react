const mongodb = require('mongodb');
const assert = require('assert');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('comments').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs.map((comment) => {
                comment.id = comment._id;
                delete (comment._id);
                return comment;
            }));
        }
    );
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
    let collection = this.db.collection('comments');
    collection.insertOne(comment).then((result) => {
        if (result.ops.length === 1) {
            comment.id = comment._id;
            delete (comment._id);
            const commentUri = request.raw.req.url + '/' + comment.id;
            reply(comment).created(commentUri);
        } else {
            reply(Boom.badRequest(`Invalid comment data: ${comment}`));
        }
    }).
        catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.remove = function (request, reply) {
    this.db.collection('comments', function (err, comments_collection) {
        if (err) throw err;
        comments_collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.commentId) },
            (err, result) => {
                if (err) throw err;
                if (result.ok) {
                    console.log('Deleted: ', request.raw.req.url);
                    reply(replaceId(result.value));
                } else {
                    reply(Boom.notFound(`Comment with Id=${request.params.commentId} not found.`));
                }
            });
    });
};

function replaceId(comment) {
     comment.id = comment._id;
     delete (comment._id);
     return comment;
}