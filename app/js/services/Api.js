'use strict'

angular.module('library')
  .factory('Api', function($http, $resource){
      return {
          User: $resource('http://localhost:8080/users/login', {}, {
              get: {
                  method: 'Get'
              }
          })
      };
  });