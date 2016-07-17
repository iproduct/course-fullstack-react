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

exports.findAll = function (request, reply) {
    let sqlQuery = 'SELECT * FROM comments';
    const qParams = [];

    if (request.query.author) {
        sqlQuery += ' WHERE author = ?';
        qParams.push(request.query.author);
    }

    this.db.all(sqlQuery, qParams, (err, results) => {
        if(err) throw err;
        reply(results);
    });
};

exports.find = function (request, reply) {
    this.db.get('SELECT * FROM comments WHERE id = ?', [request.params.commentId], 
    (err, result) => {
        if(err) throw err;
        if (typeof result !== 'undefined') {
            reply(result);
        }
        else {
            reply(Boom.notFound(`Comment with Id=${request.params.commentId} not found.`));
        }
    });
};

exports.create = function (request, reply) {
    let comment = request.payload;
    this.db.run(`INSERT INTO comments (author, text) VALUES (?, ?);`, 
        [comment.author, comment.text],
        function(err) {
            if(err) throw err;
            comment.id = this.lastID;
            const uri = request.raw.req.url + '/' + comment.id;
            console.log('Created: ', uri);
            reply(comment).created(uri);
        });
};

exports.remove = function (request, reply) {
    this.db.run('DELETE FROM comments WHERE id = ?', [request.params.commentId], 
        function(err) {
            if(err) throw err;
            if (this.changes  > 0) {
                console.log('Deleted: ', request.raw.req.url);
                reply(`Comment ${request.params.commentId} was deleted successfully.`);
            } else {
                reply(Boom.notFound(`Comment with Id=${request.params.commentId} not found.`));
            }
    });
};
