//Library imports
global.jQuery = require('jquery');
require('materialize-css/dist/js/materialize.js');            //Jquery import
require('angular');
//var preparelist = require('./prepare-list.js');             //AngularJS import
require('angular-ui-router');	//Angular-UI-Router import
//var angularMaterialize = require('angular-materialize');
var _ = require('underscore');
require('angular-loading-bar');

var psd = angular.module('psd', ['ui.router','angular-loading-bar', require('angular-animate')]);

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
        })

        .state('companyExperience', {
            url: '/experience/:coid',
            templateUrl: 'experience.html',
            controller: 'companyExpCtr'     
        })

        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginCtr'     
        });
        
});

psd.controller('sideBar', ['$scope', '$http', function($scope, $http) {
$http({method: 'GET',url: '/companies'}).then(function successCallback(response) {
    $scope.companies = response.data;
    $scope.mostViewed = _.sortBy(response.data, function(o) { return o.viewCount; })
    $scope.mostViewed.reverse();
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
$scope.startLoading = true;
$http({method: 'GET',url: '/domains'}).then(function successCallback(response) {
    var resp = response.data;
    for(var i = 0; i< resp.length; i++) {
      switch(resp[i].name) {
      case "Eco Finance":
        resp[i].dname = "Economics, Finance & Management";
        break;
      case "Electrical Electronics":
        resp[i].dname = "Electrical, Electronics, Communication & Instrumentation";
        break;
      default:
        resp[i].dname = resp[i].name;
      }
    }
    $scope.domains = resp;
    $scope.startLoading = false;
  }, function errorCallback(response) {
    alert('Try again later');
    console.log(response);
  });
}]);

psd.controller('companyEditCtr', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
  var access = document.cookie;
  if(access) {
    var access = access.substring(access.indexOf("=") + 1);
  } else {
    $state.go('login')
  }
  var data = {};
  data.cid = $stateParams.ceid;
  $scope.editable_1 = "";
  $http({method: 'GET', url: '/company/get/'+data.cid}).then(function successCallback(response) {
    if(response.data[0].editable !== "") {
      var editable = JSON.parse(response.data[0].editable);
      if(editable.coreBusiness) {
        $scope.editable_1 = editable.coreBusiness;
      }
      if(editable.projectNature) {
        $scope.editable_2 = editable.projectNature;
      }
      if(editable.companyAddress) {
        $scope.editable_3 = editable.companyAddress;
      }
    }
    
    $scope.name = response.data[0].name;
  }, function errorCallback(response) {
    console.log(response);
  });
  $scope.updateCompany = function() {
    var jsonData = {};
    jsonData.coreBusiness = $scope.editable_1;
    jsonData.projectNature = $scope.editable_2;
    jsonData.companyAddress = $scope.editable_3;
    data.content = jsonData;
    $http.post('/company/edit/'+data.cid, data).then(function successCallback(response) {
    alert("Succesfully updated");
    $scope.startLoading = false;
  }, function errorCallback(response) {
    console.log(response);
    if(response.status === 401) {
      alert("Unauthorised access, please login");
    } else {
      alert("Error, Please try again later");
    }
  });
  }
}]);

psd.controller('domainDetailCtr', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
var domainName = $stateParams.dname;
$scope.domain = {};
$scope.companies = [];
$scope.expand = function(company) {
  $scope.showModal = true;
  $scope.stipend = company.stipend;
  $scope.companyId = company._id;
  if(!(company.editable === "")) {
    var editable = JSON.parse(company.editable);
    if(editable.coreBusiness) {
      $scope.editable_1 = editable.coreBusiness;
    }
    if(editable.projectNature) {
      $scope.editable_2 = editable.projectNature;
    }
    if(editable.companyAddress) {
      $scope.editable_3 = editable.companyAddress;
    }
  } else {
    $scope.editable_1 = "More details about the company coming soon!";
    $scope.editable_2 = "More details about the company coming soon!";
    $scope.editable_3 = "More details about the company coming soon!";
  }
  $scope.modalHeader = company.name;
}
$scope.closeModal = function() {
  $scope.showModal = false;
}
$scope.startLoading = true;
$http({method: 'GET', url: '/domain/list/'+domainName}).then(function successCallback(response) {
    $scope.domain.name = domainName;
    $scope.companies = response.data;
    $scope.startLoading = false;
  }, function errorCallback(response) {
    alert('Try again later');
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
$scope.startLoading = true;
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
    $scope.startLoading = false;
    $scope.subAreas = _(data).chain().flatten().pluck('broadArea').unique().value();

  }, function errorCallback(response) {
    console.log(response);
    alert('Try again later');
  });
}]);

psd.controller('companyExpCtr', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
var cid= $stateParams.coid;
$scope.domain = {};
$scope.company = {};
$scope.company.cid= cid;
$scope.projects = [];
$scope.startLoading = true;
$scope.hasExp = true;
$http({method: 'GET', url: '/company/list/'+cid}).then(function successCallback(response) {
    var data = response.data;
    $scope.projects = _.filter(data, function(project){ return project.newsletter !== ""; }); 
    if($scope.projects.length === 0) {
      $scope.hasExp = false;
    }
    $scope.company.name = data[0].company;
    $scope.startLoading = false;
  }, function errorCallback(response) {
    console.log(response);
    alert('Try again later');
  });
}]);

psd.controller('loginCtr', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $scope.login = function() {
    var data = {};
    data.email = $scope.email;
    data.password = $scope.password;
    $http.post('/faculty/login', data).then(function successCallback(response) {
    var token = response.data;
    alert("Succesfully LoggedIn!!");
    $state.go("home");
    $scope.startLoading = false;
  }, function errorCallback(response) {
    console.log(response);
    if(response.status === 401) {
      alert("Unauthorised access, please login");
    } else {
      alert("Error, Please try again later");
    }
  });
  }
}]);