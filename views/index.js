//Library imports
require('jquery');              //Jquery import
require('angular');
var preparelist = require('./prepare-list.js');             //AngularJS import
require('angular-ui-router');	//Angular-UI-Router import


preparelist();

var psd = angular.module('psd', ['ui.router']);

psd.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'domain.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
});