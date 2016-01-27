//Library imports
include('jquery');              //Jquery import
include('angular');             //AngularJS import
include('angular-ui-router');	//Angular-UI-Router import
include('materialize-css');     //Materialize-CSS import

// create the module and name it psdApp
// include ngRoute for routing requirements
var psdApp = angular.module('psdApp', ['ui.router']);

//Routing configurations
psdApp.config(function($stateProvider, $urlRouterProvider){
	/*$urlRouterProvider.otherwise('/home');*/

	$stateProvider
		//Home state
		.state('home', {
			url: '/home',
			templateUrl: 'template/home.html',
			controller: 'homeController'
		})
		.state('domain', {
			url: '/domain',
			templateUrl: 'template/domain.html',
			controller: 'domainController'
		})
		.state('company', {
			url: 'domain/company',
			templateUrl: 'template/company.html'
			controller: 'companyController'
		})
});

psdApp.controller('homeController', function($scope, $http){
	$http.get('domain.json').then(function(response){
		$scope.domainNames = response.data.records;
	});
});

psdApp.controller('domainController', function($scope, $http){
	$http.get('list.json').then(function(response){
		$scope.companyNames = response.data.records;
	})
})

psdApp.controller('companyController', function($scope, $http) {
	$http.get('company.json').then(function(response) {
		$scope.myCompanyJSON = response.data.records;
	});
});