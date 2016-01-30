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
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('domain', {
            url: '/domain/:did',
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

psd.controller('domainDetailCtr', ['$scope', '$http', function($scope, $http) {
var did= $scope.did;
$scope.domain = {};
$scope.companies = [];
$http({method: 'GET', url: '/domain/'+did}).then(function successCallback(response) {
    var resp = response.data;
    $scope.domain.name = resp.domain;
    $scope.companies = resp.company;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);

psd.controller('companyDetailCtr', ['$scope', '$http', function($scope, $http) {
var cid= $scope.cid;
$scope.domain = {};
$scope.company = {};
$scope.projects = [];
$http({method: 'GET', url: '/company/'+cid}).then(function successCallback(response) {
    var data = response.data;
    $scope.domain.name = data.domain;
    $scope.company.name = data.company.name;
    $scope.company.description = data.company.description;
    $scope.company.year = data.company.year;
    $scope.company.sem = data.company.semester;
    $scope.projects = data.projects;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);