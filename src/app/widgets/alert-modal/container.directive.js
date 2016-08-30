import * as angular from 'angular';


angular
  .module('app.widgets')
  .directive('alertModalContainer', alertModalContainer);


/* @ngInject */
function alertModalContainer($timeout, alertModalService) {
  return {
    restrict: 'EA',
    scope: true,
    link: (scope, element, attrs) => {
      scope.$alerts = [];
      scope.$visible = false;

      // Setup events
      alertModalService.setup();
      alertModalService.subscribeToNewAlertEvent(addAlert);
      scope.$on('$destroy', () => {
        alertModalService.unsubscribeToNewAlertEvent(addAlert);
      });

      function addAlert(event, type, message, options) {
        options = options || {};

        let alert = {
          type,
          message,
          closed: false,
          close: closeAlert
        };

        function closeAlert() {
          alert.closed = true;
          layout();
        }

        scope.$alerts.push(alert);

        if (options.closeOnTimeout) {
          let timeout = parseInt(options.closeOnTimeout, 10);

          $timeout(() => {
            closeAlert();
          }, timeout);
        }

        layout();
      }

      // Remove closed alerts
      function layout() {
        for (let i = scope.$alerts.length - 1; i >= 0; i--) {
          let alert = scope.$alerts[i];

          if (alert.closed) {
            scope.$alerts.splice(i, 1);
          }
        }

        scope.$visible = scope.$alerts.length !== 0;
      }
    }
  };
}
