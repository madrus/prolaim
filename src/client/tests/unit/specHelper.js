/*jshint -W117 */
// Data provider code
// From http://blog.jphpsf.com/2012/08/30/drying-up-your-javascript-jasmine-tests

function using(name, values, func) {
    for (var i = 0, count = values.length; i < count; i++) {
        if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
            values[i] = [values[i]];
        }
        func.apply(this, values[i]);
    }
}
