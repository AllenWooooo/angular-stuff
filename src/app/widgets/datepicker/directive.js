import * as angular from 'angular';

angular
  .module('app.widgets')
  .directive('datepicker', datepicker);

/* @ngInject */
function datepicker() {
  return {
    restrict: 'A',
    template: require('./directive.html'),
    replace: true,
    link
  };

  function link(scope, element, attrs) {
    scope.isOpen = false;
    scope.options = {
      showWeeks: false
    };
    scope.toggleOpen = toggleOpen;

    function toggleOpen() {
      scope.isOpen = !scope.isOpen;
    }
  }
}
