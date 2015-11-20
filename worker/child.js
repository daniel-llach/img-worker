var colors = require('colors');

module.exports = function (inp, callback) {
  var name = inp.name;

  analyzingImage(inp.file);

  // a new image?
  function analyzingImage(file){
    var outp = {};
    outp.status = 'done';
    outp.msg = name.gray + ' starting analylizing '.gray + file.green + ' image'.gray;
    callback(null, outp);
  }
}
