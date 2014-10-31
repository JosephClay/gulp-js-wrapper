var through = require('through2'),

    keys = function(obj) {
        return Object.keys(obj);
    },

    values = function(obj) {
        return Object.keys(obj).map(function(key) {
            return (obj[key] + '');
        });
    };

var Wrapper = function(options) {
    var opts         = options || {},
        useSafeUndef = opts.safeUndef,
        globals      = opts.globals || {},
        formatParams = opts.formatParams || Wrapper.formatParams,
        formatArgs   = opts.formatArgs || Wrapper.formatArgs,
        opener       = opts.opener || Wrapper.opener,
        closer       = opts.closer || Wrapper.closer;

    // return the stream
    return through.obj(function(file, enc, callback) {

        var args = keys(globals),
            params = values(globals);

        if (useSafeUndef) { params.push('undefined'); }

        var openerStr = opener.replace('{params}', formatParams(params)),
            closerStr = closer.replace('{args}', formatArgs(args)),
            contents  = openerStr + file.contents.toString() + closerStr;

        if (file.isBuffer()) {
            file.contents = new Buffer(contents);
        }

        if (file.isStream()) {
            var stream = through();
            stream.write(new Buffer(contents));
            stream.on('error', this.emit.bind(this, 'error'));
            file.contents = file.contents.pipe(stream);
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);
        // tell the stream engine that we are done with this file
        callback();
    });
};

Wrapper.formatParams = function(params) { return params.join(', '); };
Wrapper.formatArgs = function(args) { return args.join(', '); };
Wrapper.opener = ';(function({params}) {\n';
Wrapper.closer = '\n}({args}));';

module.exports = Wrapper;