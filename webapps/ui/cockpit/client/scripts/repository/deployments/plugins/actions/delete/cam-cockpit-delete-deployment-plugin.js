'use strict';

var fs = require('fs');

var template = fs.readFileSync(__dirname + '/cam-cockpit-delete-deployment-plugin.html', 'utf8');
var modalTemplate = fs.readFileSync(__dirname + '/modals/cam-cockpit-delete-deployment-modal.html', 'utf8');

var Controller = [
  '$scope',
  '$uibModal',
  '$rootScope',
  function(
    $scope,
    $modal,
    $rootScope
  ) {

    var deploymentData = $scope.deploymentData;

    $scope.deleteDeployment = function($event, deployment) {
      $event.stopPropagation();

      $modal.open({
        controller: 'camDeleteDeploymentModalCtrl',
        template: modalTemplate,
        resolve: {
          'deploymentData': function() { return deploymentData; },
          'deployment': function() { return deployment; }
        }
      }).result.then(function() {
        $rootScope.$broadcast('cam-common:cam-searchable:query-force-change');
      });
    };

  }];

var Configuration = function PluginConfiguration(ViewsProvider) {

  ViewsProvider.registerDefaultView('cockpit.repository.deployment.action', {
    id: 'delete-deployment',
    template: template,
    controller: Controller,
    priority: 1000
  });
};

Configuration.$inject = ['ViewsProvider'];

module.exports = Configuration;
