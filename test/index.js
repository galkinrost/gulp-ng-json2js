var fs = require('fs');
var path = require('path');
var File = require('vinyl');

var json2js = require('../index');

it('should create value from json file', function (cb) {
    var stream = json2js({
        moduleName: 'TestFixtures'
    });

    var json = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.json'));

    var file = new File({
        path: 'fixtures/test.json',
        contents: new Buffer(json)
    });

    stream.on('data', function (data) {
        var result = fs.readFileSync(path.resolve(__dirname, 'expect/test.js'), 'utf-8');
        data.path.should.be.equal('fixtures/test.js');
        data.contents.toString().should.be.equal(result);
        cb();
    });

    stream.write(file);
});

it('should create value from json file with stripped prefix', function (cb) {
    var stream = json2js({
        moduleName: 'TestFixtures',
        stripPrefix: 'fixtures'
    });

    var json = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.json'));

    var file = new File({
        path: 'fixtures/test.json',
        contents: new Buffer(json)
    });

    stream.on('data', function (data) {
        var result = fs.readFileSync(path.resolve(__dirname, 'expect/stripped_prefix.js'), 'utf-8');
        data.path.should.be.equal('fixtures/test.js');
        data.contents.toString().should.be.equal(result);
        cb();
    });

    stream.write(file);
});
