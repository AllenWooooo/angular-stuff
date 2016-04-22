import angular from 'angular';


angular.module('app.data', []);
angular.module('app.widgets', []);
angular.module('app.common', []);

const modules = [
  require.context('./data', true, /\.js$/),
  require.context('./widgets', true, /\.js$/),
  require.context('./common', true, /\.js$/)
];

angular.forEach(modules, (module) => {
  module.keys().forEach(module);
});
