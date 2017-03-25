define(['angular'], function (angular){
  return ['$scope', 'StashTabService', 
    function StashTabController($scope, StashTabService){
      console.log('loaded controller');

      $scope.AccountName = '';
      $scope.SessionKey = '';
      
      $scope.Tabs = [];
      $scope.SelectedTab = null;

      $scope.GetTabs = function(){
        console.log('getting tabs');

        StashTabService.SetAuthDetails($scope.AccountName, $scope.SessionKey).then(
          StashTabService.GetTabList
        ).then(tabs => $scope.Tabs = tabs);
      }

      $scope.SelectTab = function(tab){
        $scope.SelectedTab = tab;
      };

      $scope.GetTabContents = function(tab) {
        if(tab.Track){
          StashTabService.GetTabContents(tab.Id).then(function(items){
            $scope.SelectedTab.Items = items;
          });
        }
        else {
          $scope.SelectedTab.Items = [];
        }
      }
    }
  ];
});