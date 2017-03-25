var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');

var httpPort = 3000;

var app = express();

app.use(bodyParser.json())
app.use(express.static('../website'));

var SessionKey = '';
var AccountName = '';

app.post('/session', function (req, res){
  SessionKey = req.body.SessionKey;
  AccountName = req.body.AccountName;

  res.json(req.body);
});

app.get('/tabs', function (req, res){
  console.log('Tab request for AccountName: ' + AccountName);

  var stashTabUrl = 'https://www.pathofexile.com/character-window/get-stash-items?league=Legacy&tabs=1&accountName=' + AccountName;

  var j = rp.jar();
  var cookie = rp.cookie('' + 'POESESSID=' + SessionKey);
  j.setCookie(cookie, stashTabUrl);

  rp({ uri: stashTabUrl, method: 'GET', jar: j }).then(function(response) {
    res.send(response);
  }).catch(err => {
    console.log(err);
    res.send(false);
  });
});

app.get('/tabs/:id', function (req, res){
  console.log('Getting contents of tab ' + req.params.id);

  var stashTabUrl = 'https://www.pathofexile.com/character-window/get-stash-items?league=Legacy&tabs=1&tabIndex=' + req.params.id + '&accountName=' + AccountName;

  var j = rp.jar();
  var cookie = rp.cookie('' + 'POESESSID=' + SessionKey);
  j.setCookie(cookie, stashTabUrl);

  rp({ uri: stashTabUrl, method: 'GET', jar: j }).then(function(response) {
    res.send(response);
  }).catch(err => {
    console.log(err);
    res.send(false);
  });
});

app.listen(httpPort, () => console.log('http server started on ' + httpPort));
