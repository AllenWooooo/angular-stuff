import * as angular from 'angular';


angular
  .module('app.widgets')
  .factory('alertModalService', alertModalService);


/* @ngInject */
function alertModalService($rootScope) {
  const EVENT_NAME = 'app.widgets.newAlert';
  let deregisterNewAlert = null;
  let newAlertEventSubscribers = [];

  return {
    setup,
    open,
    subscribeToNewAlertEvent,
    unsubscribeToNewAlertEvent
  };

  function setup() {
    if (!deregisterNewAlert) {
      deregisterNewAlert = $rootScope.$on(EVENT_NAME, (event, message, options) => {
        for (let subscriber of newAlertEventSubscribers) {
          subscriber(event, message, options);
        }
      });
    }
  }

  function open(type, message, options) {
    $rootScope.$evalAsync(() => $rootScope.$emit(EVENT_NAME, type, message, options));
  }

  function subscribeToNewAlertEvent(onNewAlert) {
    newAlertEventSubscribers.push(onNewAlert);
  }

  function unsubscribeToNewAlertEvent(onNewAlert) {
    let index = newAlertEventSubscribers.indexOf(onNewAlert);

    if (index >= 0) {
      newAlertEventSubscribers.splice(index, 1);
    }

    if (newAlertEventSubscribers.length === 0) {
      deregisterNewAlert();
      deregisterNewAlert = null;
    }
  }
}
