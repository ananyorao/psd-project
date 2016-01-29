//Library imports
require('jquery');              //Jquery import
require('angular');
//var preparelist = require('./prepare-list.js');             //AngularJS import
require('angular-ui-router');	//Angular-UI-Router import


//preparelist();

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
        .state('about', {
            // we'll get to this in a bit       
        });
        
});


psd.controller('domainCtr', ['$scope', '$http', function($scope, $http) {
$http({method: 'GET',url: '/domains'}).then(function successCallback(response) {
    var resp = response.data;
    $scope.domains = resp;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);