'use strict';

exports.findAll = function (request, reply) {

    let sql = 'SELECT * FROM comments';
    const params = [];

    if (request.query.author) {
        sql += ' WHERE author = ?';
        params.push(request.query.cuisine);
    }

    this.db.all(sql, params, (err, results) => {

        if (err) {
            throw err;
        }

        reply(results);
    });
};

exports.find = function (request, reply) {

    this.db.get('SELECT * FROM comments WHERE id = ?', [request.params.id], (err, result) => {

        if (err) {
            throw err;
        }

        if (typeof result !== 'undefined') {
            reply(result);
        }
        else {
            reply('Comment not found').code(404);
        }
    });
};

exports.create = function (request, reply) {

    const sql = 'INSERT INTO comments (authot, text) VALUES (?, ?)';

    this.db.run(sql,
        [
            request.payload.author,
            request.payload.text
        ],
    (err) => {

        if (err) {
            throw err;
        }

        reply({ status: 'ok' });
    });
};
