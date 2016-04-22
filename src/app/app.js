import angular from 'angular';

require('../less/app.less');


angular.element(document).ready(() => {
  require('angular-animate');

  require('angular-ui-router');
  require('angular-ui-bootstrap');
  require('./libs/sortable/ng-sortable');

  require('./app.config');
  require('./app.modules');

  require('./home');

  let requires = [
    'ngAnimate',

    'ui.router',
    'ui.bootstrap',
    'ng-sortable',

    'app.config',
    'app.data',
    'app.widgets',
    'app.common',

    'home'
  ];

  angular.module('app', requires);

  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
});
