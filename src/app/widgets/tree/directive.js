import angular from 'angular';
import _ from 'lodash';


angular
  .module('app.widgets')
  .directive('tree', tree)
  .directive('treeNode', treeNode)
  .directive('node', node);


/* @ngInject */
function tree() {
  return {
    restrict: 'E',
    scope: {
      treeNode: '='
    },
    template: require('./tree.html'),
    controller
  };

  function controller() {
    this.nodes = [];
    this.selectedNode = undefined;

    this.closeOthers = function(openNode) {
      _.forEach(this.nodes, (node) => {
        if (node !== openNode) {
          node.isOpen = false;
        }
      });
    };

    this.addNode = function(nodeScope) {
      this.nodes.push(nodeScope);

      nodeScope.$on('$destroy', (event) => {
        this.removeNode(nodeScope);
      });
    };

    this.removeNode = function(node) {
      let index = this.nodes.indexOf(node);
      if (index !== -1) {
        this.nodes.splice(index, 1);
      }
    };
  }
}


/* @ngInject */
function treeNode() {
  return {
    restrict: 'E',
    scope: {
      nodes: '='
    },
    template: require('./tree-node.html')
  };
}


/* @ngInject */
function node() {
  return {
    restrict: 'E',
    require: '^^tree',
    scope: {
      node: '='
    },
    template: require('./node.html'),
    link
  };

  function link(scope, element, attrs, treeCtrl) {
    treeCtrl.addNode(scope);

    scope.toggle = toggle;
    scope.select = select;

    function toggle() {
      scope.isOpen = !scope.isOpen;
    }

    function select() {
      if (scope.isSelected) return;

      if (treeCtrl.selectedNode !== undefined) {
        treeCtrl.selectedNode.isSelected = false;
      }

      scope.isSelected = true;
      treeCtrl.selectedNode = scope;
    }
  }
}