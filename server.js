'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyze', upload.single('upfile'), function(req, res) {
  if (!req.file) {
    res.send('File not sent!');
  }
  
  var { 
    originalname,
    mimetype,
    size
  } = req.file;
  res.send(JSON.stringify({ name: originalname, type: mimetype, size: size }));
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
