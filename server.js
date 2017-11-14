
var http = require('http');
var path = require('path');
var URL = require('url');
var express = require('express');
var app = express();
app.use(express.static(__dirname));
var urls = [];

function find(targetUrl){
  for(var i = 0; i < urls.length; i++){
    if(urls[i] == targetUrl) {
      return i;
    }
  }
  urls.push(targetUrl);
  return urls.length - 1;
}

var port = process.env.PORT || 3000;
app.get('/news/*', function(req, res){
  var pathurl = req.params[0];
  var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if(!reg.test(pathurl)){res.send('error url')}
  else{
    var shortUrl = 'https://url-shortener-irisying.c9users.io/'+find(pathurl);
    res.json({
      'url': pathurl,
      'shortenurl' : shortUrl
    });
    
    }
  }
  
);

app.get('/:id', function(req, res){
  var id = req.params.id;
  if(id < urls.length) {
    res.redirect(urls[id]);
  }
  else {
    res.send('Not a vaild shorten url');
  }
} 
);

app.get('/', function(req, res){
    var indexhttp = path.join(__dirname, 'index.html');
    res.send(indexhttp);
});
app.listen(port, function () {
  console.log('Node app listening on port ' + port + '!');
});