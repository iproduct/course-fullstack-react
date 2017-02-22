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

const mongodb = require('mongodb');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Bcrypt = require('bcrypt-nodejs');

exports.login = function (request, reply) {
this.db.collection('users').findOne({ email: request.payload.email })
        .then(user => {
            console.log(`Comparing passwords: ${request.payload.password} and ${user.password}`);
            Bcrypt.compare(request.payload.password, user.password, (err, res) => {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(`Error while creating session on the server.`));
                }

                if (!res) {
                    return reply(Boom.unauthorized(`Invalid email or password.`));
                }

                // Create a session in MongoDB and return encripted token
                this.sessionsDB.collection('sessions')
                    .findOneAndUpdate(
                    { email: request.payload.email },
                    {$set: {
                        lastAccess: new Date(),
                        email: user.email,
                        fname: user.fname,
                        lname: user.lname,
                        role: user.role
                    }},
                    { upsert: true, returnOriginal: false })
                    .then(result => {
                        let upsertedUser = result.value;
                        console.log(`User session created: ${JSON.stringify(upsertedUser)}`);
                        let token = JWT.sign(upsertedUser, this.JWT_SECRET, 
                            {expiresIn: this.SESSIONS_EXPIRATION_TIMEOUT}); // synchronous, in seconds
                        console.log(`Token: ${token}`);
                        return reply({ token: token });
                    }).catch(err => {
                        console.err(err);
                        return reply(Boom.badImplementation(`Error while creating session on the server.`));
                    });
            });
        }).catch(err => {
            return reply(Boom.unauthorized(`Invalid email or password.`));
        });
}

    // this.db.collection('users').findOne({ email: request.payload.email })
    //     .then(user => {
    //         console.log(`Comparing passwords: ${request.payload.password} and ${user.password}`);
    //         Bcrypt.compare(request.payload.password, user.password, (err, res) => {
    //             if (err) {
    //                 console.error(err);
    //                 return reply(Boom.badImplementation(`Error while creating session on the server.`));
    //             }

    //             if (!res) {
    //                 return reply(Boom.unauthorized(`Invalid email or password.`));
    //             }

    //             // Create a session in MongoDB and return encripted token
    //             this.sessionsDB.collection('sessions')
    //                 .findOneAndUpdate(
    //                 { email: request.payload.email },
    //                 {$set: {
    //                     lastAccess: new Date(),
    //                     email: user.email,
    //                     fname: user.fname,
    //                     lname: user.lname,
    //                     role: user.role
    //                 }},
    //                 { upsert: true, returnOriginal: false })
    //                 .then(result => {
    //                     let upsertedUser = result.value;
    //                     console.log(`User session created: ${JSON.stringify(upsertedUser)}`);
    //                     let token = JWT.sign(upsertedUser, this.JWT_SECRET, 
    //                         {expiresIn: this.SESSIONS_EXPIRATION_TIMEOUT}); // synchronous, in seconds
    //                     console.log(`Token: ${token}`);
    //                     return reply({ token: token });
    //                 }).catch(err => {
    //                     console.err(err);
    //                     return reply(Boom.badImplementation(`Error while creating session on the server.`));
    //                 });
    //         });
    //     }).catch(err => {
    //         return reply(Boom.unauthorized(`Invalid email or password.`));
    //     });

    // function (err, docs) {
    //     if (err) throw err;
    //     reply(docs.map((test) => {
    //         test.id = test._id;
    //         delete (test._id);
    //         return test;
    //     }));
    // }
    // );

    // const sql = 'SELECT * from users where username = ?';

    // this.db.get(sql, [request.payload.username], (err, result) => {

    //     if (err) {
    //         throw err;
    //     }

    //     const user = result;

    //     if (!user) {
    //         return reply('Not authorized').code(401);
    //     }


    // });
    // if (request.headers.authorization)
    //     let decoded = jwt.decode(request.headers.authorization, this.jwtPrivateKey);
    // var session;
    // redisClient.get(decoded.id, function (rediserror, redisreply) {
    //     /* istanbul ignore if */
    //     if (rediserror) {
    //         console.log(rediserror);
    //     }
    //     session = JSON.parse(redisreply)
    //     console.log(' - - - - - - SESSION - - - - - - - -')
    //     console.log(session);
    //     // update the session to no longer valid:
    //     session.valid = false;
    //     session.ended = new Date().getTime();
    //     // create the session in Redis
    //     redisClient.set(session.id, JSON.stringify(session));

    //     reply({ text: 'You have been logged out!' })
    // })

    // var session = {
    //     lastAccess: new Date(),
    //     valid: true, // this will be set to false when the person logs out
    // }
    // // create the session in Redis
    // redisClient.set(session.id, JSON.stringify(session));
    // // sign the session as a JWT
    // var token = JWT.sign(session, process.env.JWT_SECRET); // synchronous
    // console.log(token);

    // reply({ text: 'Check Auth Header for your Token' })
    //     .header("Authorization", token);
// }


exports.find = function (request, reply) {
    this.db.collection('tests', function (err, tests_collection) {
        if (err) throw err;
        tests_collection.findOne({ _id: new mongodb.ObjectID(request.params.testId) },
            (err, test) => {
                if (err) throw err;
                if (test === null) {
                    reply(Boom.notFound(`Test with Id=${request.params.testId} not found.`));
                } else {
                    test.id = test._id;
                    delete (test._id);
                    reply(test);
                }

            });
    });
};

exports.create = function (request, reply) {
    let test = request.payload;
    let collection = this.db.collection('tests');
    console.log('Inserting test:', test);
    collection.insertOne(test).then((result) => {
        if (result.result.ok && result.insertedCount === 1) {
            const testUri = request.raw.req.url + '/' + test._id;
            reply(replaceId(test)).created(testUri);
        } else {
            reply(Boom.badRequest(`Invalid test data: ${test}`));
        }
    }).
        catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.edit = function (request, reply) {
    let test = request.payload;
    if (test.id !== request.params.testId) {
        reply(Boom.badRequest(`Invalid test data - id in url doesn't match: ${test}`));
        return;
    }
    test._id = new mongodb.ObjectID(test.id);
    delete (test.id);
    let collection = this.db.collection('tests');
    console.log('Editing test:', test);
    collection.updateOne({ _id: new mongodb.ObjectID(test._id) }, { "$set": test })
        .then((result) => {
            test = replaceId(test);
            if (result.result.ok && result.modifiedCount === 1) {
                reply(test);
            } else {
                reply(Boom.badRequest(`Data was NOT modified in database: ${JSON.stringify(test)}`));
            }
        }).catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.remove = function (request, reply) {
    let collection = this.db.collection('tests');
    collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.testId) })
        .then((result) => {
            if (result.ok) {
                console.log('Deleted: ', request.raw.req.url);
                reply(replaceId(result.value));
            } else {
                reply(Boom.notFound(`Test with Id=${request.params.testId} not found.`));
            }
        }).catch((err) => {
            reply(Boom.notFound(`Test with Id=${request.params.testId} not found.`));
        });
};

function replaceId(test) {
    test.id = test._id;
    delete (test._id);
    return test;
}
