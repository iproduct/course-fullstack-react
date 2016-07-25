"use strict";
// Mongo
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function () { });
function getUser(id, callback) {
    db.collection('users', function (error, users) {
        if (error) {
            console.error(error);
            return;
        }
        users.findOne({ _id: id }, function (error, user) {
            if (error) {
                console.error(error);
                return;
            }
            callback(user);
        });
    });
}
exports.getUser = getUser;
function getUsers(callback) {
    db.collection('users', function (error, users_collection) {
        if (error) {
            console.error(error);
            return;
        }
        users_collection.find({}, { '_id': 1 }).toArray(function (error, userobjs) {
            if (error) {
                console.error(error);
                return;
            }
            callback(userobjs);
        });
    });
}
exports.getUsers = getUsers;
function getImage(imageId, callback) {
    db.collection('images', function (error, images_collection) {
        if (error) {
            console.error(error);
            return;
        }
        images_collection.findOne({ _id: new mongodb.ObjectID(imageId) }, function (error, image) {
            if (error) {
                console.error(error);
                return;
            }
            callback(image);
        });
    });
}
exports.getImage = getImage;
function getImages(imageIds, callback) {
    db.collection('images', function (error, images_collection) {
        if (error) {
            console.error(error);
            return;
        }
        images_collection.find({ _id: { $in: imageIds } }).toArray(function (error, images) {
            callback(images);
        });
    });
}
exports.getImages = getImages;
function addBoard(userid, title, description, callback) {
    db.collection('users', function (error, users) {
        if (error) {
            console.error(error);
            return;
        }
        users.update({ _id: userid }, { "$push": { boards: { title: title, description: description, images: [] } } }, function (error, user) {
            if (error) {
                console.error(error);
                return;
            }
            callback(user);
        });
    });
}
exports.addBoard = addBoard;
function addPin(userid, boardid, imageUri, link, caption, callback) {
    db.collection('images', function (error, images_collection) {
        if (error) {
            console.error(error);
            return;
        }
        images_collection.insert({
            user: userid,
            caption: caption,
            imageUri: imageUri,
            link: link,
            board: boardid,
            comments: []
        }, function (error, image) {
            console.log(image);
            db.collection('users', function (error, users) {
                if (error) {
                    console.error(error);
                    return;
                }
                users.update({ _id: userid, "boards.title": boardid }, { "$push": { "boards.$.images": image[0]._id } }, function (error, user) {
                    callback(user);
                });
            });
        });
    });
}
exports.addPin = addPin;
//# sourceMappingURL=db.js.map