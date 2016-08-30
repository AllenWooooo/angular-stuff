import * as angular from 'angular';


angular
  .module('app.widgets')
  .directive('alertModal', alertModal);


/* @ngInject */
function alertModal() {
  return {
    restrict: 'EA',
    template: require('./directive.html'),
    require: '^alertModalContainer',
    scope: {
      type: '@',
      message: '@',
      close: '&'
    }
  };
}
