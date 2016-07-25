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
const assert = require('assert');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('tests').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs.map((test) => {
                test.id = test._id;
                delete (test._id);
                return test;
            }));
        }
    );
};

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
                    console.log(test);
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
        if (result.ops.length === 1) {
            test.id = test._id;
            delete (test._id);
            const testUri = request.raw.req.url + '/' + test.id;
            reply(test).created(testUri);
        } else {
            reply(Boom.badRequest(`Invalid test data: ${test}`));
        }
    }).
        catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.remove = function (request, reply) {
    this.db.collection('tests', function (err, tests_collection) {
        if (err) throw err;
        tests_collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.testId) },
            (err, result) => {
                if (err) throw err;
                if (result.ok) {
                    console.log('Deleted: ', request.raw.req.url);
                    reply(replaceId(result.value));
                } else {
                    reply(Boom.notFound(`Test with Id=${request.params.testId} not found.`));
                }
            });
    });
};

function replaceId(test) {
     test.id = test._id;
     delete (test._id);
     return test;
}
