gulp-js-wrapper
===============

Easily encapsulate js files. Good for minification or to prevent leaking variables to the window.

`npm install gulp-js-wrapper`

#Example

```
var gulp    = require('gulp'),
    jswrap = require('gulp-js-wrapper');

gulp.src('test.js')
    .pipe(jswrap({
        // pass a safe undefined into the encapsulation
        safeUndef: true,
        globals: {
            // key will be the argument
            // value will be the parameter
            'window': 'root'
        }
    }))
    .pipe(gulp.dest('./build/'));
```

#Options

#### opener
Type : `[String]`

The string to use as the opener. By default, this is `;(function({params}){`. `{params}` will be replaced
by the parameters from `globals` and `safeUndef`.

#### closer
Type : `[String]`

The string to use as the closer. By default, this is `}({args}))`. `{args}` will be replaced by
the arguments from `globals`.

#### safeUndef
Type : `[Boolean]`

Whether to include a safe `undefined` in the parameters.

```
;(function(undefined) {

    // typeof undefined === 'undefined'

}());
```

#### globals
Type : `[Object]`

An `argument: 'parameter'` object to use to construct the encapsulation. Keys from the object
will be used as arguments and the values as parameters. For example, passing `{ 'window': 'root' }`
will result in:

```
;(function(root) {

    // root === window

}(window));

```

#License

The MIT License (MIT)

Copyright (c) 2014 Joseph Clay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.