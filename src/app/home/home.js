import angular from 'angular';

angular
  .module('home')
  .config(routeConfig);


/* @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: require('./index.html'),
      controller: HomeController,
      controllerAs: 'home'
    });
}

/* @ngInject */
function HomeController() {
  let vm = this;

  vm.treeNode = [{
    name: 'tree-1',
    children: [{
      name: 'tree-1-1'
    },{
      name: 'tree-1-2'
    },{
      name: 'tree-1-3'
    }]
  },{
    name: 'tree-2',
    children: [{
      name: 'tree-2-1',
      children: [{
        name: 'tree-2-1-1'
      },{
        name: 'tree-2-1-2'
      },{
        name: 'tree-2-1-3'
      }]
    },{
      name: 'tree-2-2'
    },{
      name: 'tree-2-3'
    }]
  },{
    name: 'tree-3',
    children: [{
      name: 'tree-3-1'
    },{
      name: 'tree-3-2'
    },{
      name: 'tree-3-3'
    }]
  }];
}
