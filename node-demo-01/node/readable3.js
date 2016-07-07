const Readable = require('stream').Readable;

//lets test it
let rs = new Readable(
    function (char) {
        return {
            read(size) {
                rs.push(String.fromCharCode(char++));
                if (char > 'z'.charCodeAt(0)) rs.push(null);
            }
        }
    } (97)
);
rs.pipe(process.stdout);