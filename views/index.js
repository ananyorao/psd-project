//Library imports
global.jQuery = require('jquery');
require('materialize-css/dist/js/materialize.js');            //Jquery import
require('angular');
//var preparelist = require('./prepare-list.js');             //AngularJS import
require('angular-ui-router');	//Angular-UI-Router import
//var angularMaterialize = require('angular-materialize');
var _ = require('underscore');

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
        })

        .state('companyEdit', {
            url: '/companyedit/:ceid',
            templateUrl: 'companyEdit.html',
            controller: 'companyEditCtr'     
        });
        
});

psd.controller('sideBar', ['$scope', '$http', function($scope, $http) {
$http({method: 'GET',url: '/companies'}).then(function successCallback(response) {
    $scope.companies = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
}]);

psd.run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess', function() {
   document.body.scrollTop = document.documentElement.scrollTop = 0;
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

psd.controller('companyEditCtr', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  var data = {};
  data.cid = $stateParams.ceid;
  $scope.editable = "";
  $http({method: 'GET', url: '/company/get/'+data.cid}).then(function successCallback(response) {
    $scope.editable = response.data[0].editable;
  }, function errorCallback(response) {
    console.log(response);
  });
  $scope.updateCompany = function() {
    data.content = $scope.editable;
    $http.post('/company/edit/'+data.cid, data).then(function successCallback(response) {
    console.log(response);
  }, function errorCallback(response) {
    console.log(response);
  });
  }
}]);

psd.controller('domainDetailCtr', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
var domainName = $stateParams.dname;
$scope.domain = {};
$scope.companies = [];
$scope.editable = "More details about the company coming soon!";
$scope.expand = function(company) {
  $scope.showModal = true;
  $scope.stipend = company.stipend;
  $scope.companyId = company._id;
  if(!(company.editable === "")) {
    $scope.editable = company.editable;
  }
  $scope.modalHeader = company.name;
}
$scope.closeModal = function() {
  $scope.showModal = false;
}
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
$scope.closeModal = function() {
  $scope.showModal = false;
}
$http({method: 'GET', url: '/company/list/'+cid}).then(function successCallback(response) {
    var data = response.data;
    $scope.projects = data;
    $scope.company.name = data[0].company;
    $scope.expand = function(project) {
      $scope.showModal = true;
      $scope.summary = project.summary;
      $scope.objective = project.objective;
      $scope.natureOfWork = project.natureOfWork;
      $scope.futureScope = project.futureScope;
      $scope.newsletter = project.newsletter;
      $scope.projectContribution = project.projectContribution;
      $scope.showNewsletter = true;
      if(project.newsletter === "") {
        $scope.showNewsletter = false;
      }
    }
    $scope.subAreas = _(data).chain().flatten().pluck('broadArea').unique().value();

  }, function errorCallback(response) {
    console.log(response);
  });
}]);