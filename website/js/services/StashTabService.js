define(['angular', 'models/ItemModel'], function (angular, ItemModel){
  return ['$http', '$sce', '$timeout', 
    function StashTabService($http, $sce, $timeout){
      this.TrackedTabs = {};

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
            // TODO: Convert to tab model
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
        ).then(function(response){
          response.data.Added = response.data.Added.map(i => new ItemModel(i));
          return response.data;
        });
      }

      this.TrackTabContents = function _trackTabContents(tabId, duration, callback) {
        this.TrackedTabs[tabId] = _getContentsAndReTrack.call(this, tabId, duration, callback);
      }

      this.CancelTabTracking = function _cancelTabTracking(tabId) {
        $timeout.cancel(this.TrackedTabs[tabId]);
      }

      function _getContentsAndReTrack(tabId, duration, callback){
        return $timeout(() => {
          this.GetTabContents(tabId).then(
            items => callback(items)
          ).then(() => {
            this.TrackedTabs[tabId] = _getContentsAndReTrack.call(this, tabId, duration, callback);
          });
        }, duration);
      }

      function _buildRgbString(colour) {
         return 'rgb(' + colour.r + ',' + colour.g + ',' +  colour.b + ')';
      }
    }
  ]
});