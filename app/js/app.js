const app = angular.module('library', [ // eslint-disable-line angular/di
    'ngRoute',
    'angular-loading-bar',
    'ui.bootstrap',
    'ngResource',
    'ngTable',
    'xeditable',
    'ui.select',
    'ngSanitize',
    'checklist-model',
    'ngMessages',
    'ui.grid',
    'ui.grid.exporter',
    'ui.grid.pagination',
    'ui.grid.selection',
    'gettext'
])
    .config(function ($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'app/views/login.html',
                controller: 'LoginCtrl',
            })

            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })

            .when('/home', {
                templateUrl: 'app/views/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });