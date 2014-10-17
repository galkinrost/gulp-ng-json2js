var path = require('path');

var gutil = require('gulp-util');
var through = require('through2');

var VALUE_TPL =
    '(function (module) {\n' +
    '    try {\n' +
    '        module = angular.module(\'${moduleName}\');\n' +
    '    } catch (e) {\n' +
    '        module = angular.module(\'${moduleName}\', []);\n' +
    '    }\n' +
    '    module.value(\'${valueName}\', ${value});' +
    '})();\n';

/**
 *
 * @param options
 * @property options.moduleName {String} A name of module where generated values be located
 * @property options.rename {Function} A method to convert a json filepath to a values`s name
 * @property options.stripPrefix {String} Path`s prefix will be stripped
 * @property options.prefix {String} A prefix to file`s path
 * @property options.postfix {String} A value`s name postfix
 * @returns {*}
 */
module.exports = function (options) {
    'use strict';

    options = options || {};
    options.moduleName = options.moduleName || 'json';
    options.postfix = options.postfix || 'Value';
    options.rename = options.rename || function (filepath) {
        var name = '';
        var extname = path.extname(filepath);
        filepath.substring(0, filepath.length - extname.length)
            .split(path.sep)
            .forEach(function (pathchunk) {
                name += camelize(pathchunk);
            });

        return name + options.postfix;
    };

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function camelize(str) {
        var camelizedStr = '';
        str.split(/[-_]+/)
            .forEach(function (chunk) {
                camelizedStr += capitalize(chunk);
            });
        return camelizedStr;
    }

    function getFileUrl(file) {
        // Start with the relative file path
        var filepath = file.relative;

        // Replace '\' with '/' (Windows)
        filepath = filepath.replace(/\\/g, '/');

        // Remove the stripPrefix
        if (options && options.stripPrefix && filepath.indexOf(options.stripPrefix) === 0) {
            filepath = filepath.replace(options.stripPrefix, '');
        }
        // Add the prefix
        if (options && options.prefix) {
            filepath = options.prefix + filepath;
        }

        // Rename the filepath
        if (options && options.rename) {
            filepath = options.rename(filepath);
        }

        return filepath;
    }

    return through.obj(function (file, enc, done) {

        if (file.isNull()) {
            this.push(file);
            return done();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-ng-json2js', 'Streaming not supported'));
            return done();
        }
        try {
            var fileUrl = getFileUrl(file);

            var value = gutil.template(VALUE_TPL, {
                moduleName: options.moduleName,
                valueName: fileUrl,
                value: file.contents.toString(),
                file: file
            });

            file.contents = new Buffer(value);

            file.path = gutil.replaceExtension(file.path, '.js');

            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-ng-json2js', err));
        }

        done();
    });
};