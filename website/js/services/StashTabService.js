define(['angular'], function (angular){
  return ['$http', '$sce', 
    function StashTabService($http, $sce){
      var FrameTypes = [
        'Normal',
        'Magic',
        'Rare',
        'Unique',
        'Gem',
        'Currency',
        'Divination card',
        'Quest item',
        'Prophecy',
        'Relic'
      ];

      this.ApiUrl = 'http://www.pathofexile.com/character-window/get-stash-items';

      this.SetAuthDetails = function _setAuthDetails(accountName, sessionKey) {
        return $http.post(
          'http://localhost:3000/session',
          {
            AccountName: accountName,
            SessionKey: sessionKey
          }
        );
      }

      this.GetTabList = function _getTabs() {
        return $http.get(
          'http://localhost:3000/tabs'
        ).then(function(response){
          if(!response.data){ throw 'Response data is false; is the session key set?'; }

          return response.data;
        }).then(function(data){

          return data.tabs.filter(function(t){
            return !t.hidden;
          }).map(function(t){
            return {
              Id: t.i,
              Name: t.n,
              Colour: _buildRgbString(t.colour),
              Track: false,
              UpdateInterval: 1,
              Items: []
            };
          });

        }).catch(err => console.log(err));
      }

      this.GetTabContents = function _getTabContents(tabId) {
       return $http.get(
         'http://localhost:3000/tabs/' + tabId
       ).then(function(data){
         return data.data.items.map(function(i){
           i.name = i.name.replace('<<set:MS>><<set:M>><<set:S>>', '');

           if(!i.name) {
             i.name = i.typeLine;
             i.typeLine = '';
           }

           i.rarity = FrameTypes[i.frameType];

           return i;
         });
       });
      }

      function _buildRgbString(colour) {
         return 'rgb(' + colour.r + ',' + colour.g + ',' +  colour.b + ')';
      }
    }
  ]
});