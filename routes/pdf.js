var moment = require('moment'),
  jadepdf = require('jade-pdf-redline'),
  fs = require('fs');

function todays_date(){
  return moment().format("MMM Do YYYY");
}

exports.new = function(req,res) {
    res.render('pdf/new', {});
}

exports.create = function(req,res) {
  var donation = req.body.donation || {};
  var model = {
    donation: donation,
    todays_date: todays_date()
  };
  res.render('pdf/view', model);
}

exports.generate_pdf = function(req,res) {
  var donation = req.body.donation || {};
  // set absolute paths to images & css so the PDF renderer works properly
  var pathToLogo = __dirname + "/../public/images/logo.png"
  var pathToCss = __dirname + "/../public/stylesheets/pdf.css"
  var model = {
    donation: donation,
    todays_date: todays_date(),
    pathToLogo: pathToLogo,
    pathToCss: pathToCss
  };

  res.set({
    'Content-Type': 'application/pdf'
  });
  fs.createReadStream('views/pdf/pdf_template.jade')
  .pipe(jadepdf({
    locals: model,
    cssPath: pathToCss
  }))
  .pipe(res);
}