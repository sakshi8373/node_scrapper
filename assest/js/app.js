'use strict';
var app = angular.module('MyApp', ['ui.router','blockUI','toastr']);

app.config(function ( $stateProvider, $urlRouterProvider, $sceProvider, $httpProvider){
	// $sceProvider.enabled(false);
	

	//$httpProvider.interceptors.push('httpModifier');
	$stateProvider
		.state('signUp',{
			url: '/signUp',
			controller: 'signupCtrl',
			templateUrl: '../templates/signUp.html'
		})
		.state('login',{
			url: '/login',
			controller: 'loginCtrl',
			templateUrl: '../templates/login.html'
		})
		  .state('searchResult', {
            url: '/searchResult',
            controller: 'searchResultCtrl',
            templateUrl: 'templates/searchResult.html'
        })
		 .state('keyWordList', {
            url: '/keyWordList',
            controller: 'keyWordListCtrl',
            templateUrl: 'templates/keyWordList.html'
        }) .state('savedImagesList', {
            url: '/savedImagesList',
            controller: 'savedImagesListCtrl',
            templateUrl: 'templates/savedImagesList.html'
        })


    .state('menu.userManagement', {
        url: '/userManagement',
        controller: 'userManagementCtrl',
        templateUrl: 'templates/userManagement.html',
    })
	$urlRouterProvider.otherwise('/login');
})

