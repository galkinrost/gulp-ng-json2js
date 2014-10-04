gulp-ng-json2js
=========

The plugin to wrap `json` fixtures as an angular value

What is the result?
--
See <a href="https://github.com/galkinrost/gulp-ng-json2js/tree/master/test/expect">here</a>

Install
--
```sh
npm install gulp-ng-json2js
```

Usage
--

```javascript
var gulp=require('gulp');

var json2js=require('gulp-ng-json2js');
var concat=require('gulp-concat');

gulp.task('fixtures',function(){
    return gulp.src('./test/fixtures/**/*.json')
                .pipe(json2js({
                    moduleName:'app.fixtures'
                }))
                .pipe(concat('fixtures.js'))
                .pipe(gulp.dest('./build/'));
});
```

options.moduleName
--
Type: 'Sting'

The name of the generated AngularJS module.

options.prefix
--
Type: `String`

The prefix which should be prepended to the file path to generate the file url.

options.stripPrefix
--
Type: `String`

The prefix which should be subtracted from the file path to generate the file url.

options.rename
--
Type: `Function`

A function that allows the generate file url to be manipulated. For example:

```
function (url) {
  return url.replace('.json', '');
}
```
```
AND
```sh
gulp fixtures
```


Tests
--
```sh
npm test
```

License
----
