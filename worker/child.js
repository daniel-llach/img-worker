module.exports = function (inp, callback) {
  var colors = require('colors');
  callback(null, 'worker '.gray + inp.green + ' ready ...'.gray);
}
