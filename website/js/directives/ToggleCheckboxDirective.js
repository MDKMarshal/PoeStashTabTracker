// based on https://github.com/minhur/bootstrap-toggle/issues/19
define(['angular', 'bootstrap-toggle'], function (angular, bootstrapToggle){
  return function ToggleCheckboxDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attributes, ngModelController) {
        element.on('change.toggle', function(event) { // note that ".toogle" is our namespace, used further down to remove the handler again
          var checked = element.prop('checked');
          ngModelController.$setViewValue(checked);
        });

        ngModelController.$render = function() {
          element.bootstrapToggle(ngModelController.$viewValue ? 'on' : 'off');
        };

        scope.$on('$destroy', function() {
          // clean up
          element.off('change.toggle');
          element.bootstrapToggle('destroy');
        });

        // we set the 'checked' property once so the Bootstrap toggle is initialized to the correct value, i.e.,  without flashing the 'off' state and then switch to the 'on' state in case of an initial value of 'true';
        // this is not needed if your markup already contains the correct 'checked' property;
        // note that we can't use ngModelController.$viewValue since at this stage, it's still uninitialized as NaN
        var initialValue = scope.$eval(attributes.ngModel);
        element.prop('checked', initialValue);
      }
    };
  }
});