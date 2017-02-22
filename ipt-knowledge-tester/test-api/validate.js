/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial usering and evaluation purposes only. 
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

const accounts = {
    123: {
        id: 123,
        user: 'john',
        fullName: 'John Doe',
        scope: ['a', 'b']
    }
};

module.exports = function (request, decodedToken, callback) {
    this.sessionsDB.collection('sessions')
        .findOne(decodedToken._id,
        { email: request.payload.email },
        {
            $set: {
                lastAccess: new Date(),
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                role: user.role
            }
        },
        { upsert: true, returnOriginal: false })
        .then(result => {
            let upsertedUser = result.value;
            console.log(`User session created: ${JSON.stringify(upsertedUser)}`);
            let token = JWT.sign(upsertedUser, this.JWT_SECRET,
                { expiresIn: this.SESSIONS_EXPIRATION_TIMEOUT }); // synchronous, in seconds
            console.log(`Token: ${token}`);
            return reply({ token: token });
        }).catch(err => {
            console.err(err);
            return reply(Boom.badImplementation(`Error while creating session on the server.`));
        });


    var error,
        credentials = accounts[decodedToken.accountId] || {};

    if (!credentials) {
        return callback(error, false, credentials);
    }

    return callback(error, true, credentials);
};
