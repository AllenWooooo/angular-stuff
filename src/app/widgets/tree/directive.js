import angular from 'angular';
import _ from 'lodash';


angular
  .module('app.widgets')
  .directive('tree', tree);


/* @ngInject */
function tree($compile) {
  return {
    restrict: 'E',
    scope: {
      treeNode: '='
    },
    link
  };

  function link(scope, element, attrs) {
    let onSelected = attrs.onSelected;
    let template = require('./template.html');
    element.html('').append($compile(template)(scope));

    scope.toggle = toggle;
    scope.select = select;

    function toggle(target) {
      target.isOpen = !target.isOpen;
    }

    function select(target) {
      let currentSelected = _.find(scope.treeNode, ['isSelected', true]);
      
      if (currentSelected) {
        currentSelected.isSelected = false;
      }
      target.isSelected = true;

      if (onSelected) {
        return onSelected();
      }
    }
  }
}
