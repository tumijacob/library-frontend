'use strict'
angular.module('library')
    .controller('HomeCtrl', function($scope){
        console.log('Home page');

        $scope.searchButton = function(data) {
         console.log(data + '' + 'Make an http call to the db');

        }

    });