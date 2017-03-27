var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');

var httpPort = 3000;

var app = express();

app.use(bodyParser.json())
app.use(express.static('../website'));

var SessionKey = '';
var AccountName = '';

var cachedItems = {};

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
  var tabId = req.params.id;

  console.log('Getting contents of tab ' + tabId);

  var stashTabUrl = 'https://www.pathofexile.com/character-window/get-stash-items?league=Legacy&tabs=1&tabIndex=' + req.params.id + '&accountName=' + AccountName;

  var j = rp.jar();
  var cookie = rp.cookie('' + 'POESESSID=' + SessionKey);
  j.setCookie(cookie, stashTabUrl);

  rp({ uri: stashTabUrl, method: 'GET', jar: j }).then(function(response) {
    var itemsFromApi = JSON.parse(response).items;

    if(!cachedItems[tabId]) {
      console.log('First request for tab ' + tabId);
      cachedItems[tabId] = itemsFromApi;
      res.send({
        Added: [],
        Removed: []
      });
    }
    else {
      console.log(
        'Update request for tab ' + tabId + ', cache: ' + (cachedItems[tabId] || []).length + ', current: ' + itemsFromApi.length
      );
      
      var addedItems = _itemDiff(cachedItems[tabId], itemsFromApi);
      var removedDiff = _itemDiff(itemsFromApi, cachedItems[tabId]);
      var removedItems = removedDiff.reduce(((a, v) => {a[v.id] = true; return a;}), {});

      console.log('Added ' + addedItems.length + ', Removed ' + removedDiff.length );

      cachedItems[tabId] = itemsFromApi;
      res.send({
        Added: addedItems,
        Removed: removedItems
      });
    }
  }).catch(err => {
    console.log(err);
    res.send(false);
  });
});

app.listen(httpPort, () => console.log('http server started on ' + httpPort));

function _itemDiff(oldItems, newItems) {
  oldItems = oldItems || [];
  newItems = newItems || [];

  if(oldItems.length == 0){
    return newItems;
  }

  var oldMap = oldItems.reduce(((a, v) => {a[v.id] = true; return a;}), {});
  return newItems.filter(i => !oldMap.hasOwnProperty(i.id));
}