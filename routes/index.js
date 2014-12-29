var express = require('express');

module.exports = (function() {
   var router = express.Router();
  
   /* GET home page. */
   router.get('/', function(req, res) {
     res.render('index', { title: 'Dandy Walker Alliance' });
   });

   return router;
})();