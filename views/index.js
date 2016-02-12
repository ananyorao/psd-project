//Library imports
global.jQuery = require('jquery');
require('materialize-css/dist/js/materialize.js');            //Jquery import
require('angular');
//var preparelist = require('./prepare-list.js');             //AngularJS import
require('angular-ui-router');	//Angular-UI-Router import
var angularMaterialize = require('angular-materialize');

var psd = angular.module('psd', ['ui.router']);

psd.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'domain.html',
            controller: 'domainCtr'
        })
        
        .state('domain', {
            url: '/domain/:dname',
            templateUrl: 'domainDetail.html',
            controller: 'domainDetailCtr'     
        })

        .state('company', {
            url: '/company/:cid',
            templateUrl: 'companyDetail.html',
            controller: 'companyDetailCtr'     
        });
        
});

psd.controller('sideBar', ['$scope', '$http', function($scope, $http) {
$http({method: 'GET',url: '/companies'}).then(function successCallback(response) {
    $scope.companies = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);


psd.controller('domainCtr', ['$scope', '$http', function($scope, $http) {
$http({method: 'GET',url: '/domains'}).then(function successCallback(response) {
    var resp = response.data;
    $scope.domains = resp;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);

psd.controller('domainDetailCtr', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
var domainName = $stateParams.dname;
$scope.domain = {};
$scope.companies = [];
$http({method: 'GET', url: '/domain/list/'+domainName}).then(function successCallback(response) {
    $scope.domain.name = domainName;
    $scope.companies = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);

psd.controller('companyDetailCtr', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
var cid= $stateParams.cid;
$scope.domain = {};
$scope.company = {};
$scope.projects = [];
$http({method: 'GET', url: '/company/list/'+cid}).then(function successCallback(response) {
    var data = response.data;
    $scope.projects = data;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);