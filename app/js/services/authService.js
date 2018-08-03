'use strict';

angular.module('library')
  .factory('AuthService', function($http,Api, $rootscope, Base64) {
      const loggedOnUser = angular.fromJson(localStorage.getItem('loggedOnUser'));
      const session = angular.fromJson(localStorage.getItem('consoleSession'));

      function refreshSession() {
          const currentTime = new Date().getTime();
          const expiryTime = new Date(currentTime + (1000 * 60 * 60));

          const firstName = loggedOnUser.firstName || '';
          const lastName = loggedOnUser.lastName || '';
          const fullName = firstName + ' ' + lastName;

          session = {
              sessionUser: loggedOnUser.username,
              sessionUsername: fullName,
              expiryTime: expiryTime.getTime()
          };
          $rootscope.sessionUserName = session.sessionUsername;

          localStorage.setItem('consoleSession', angular.toJson(session));
      }
      
      function setLoggedOnUser(user) {
          $rootscope.user = user;
          loggedOnUser = user;
          localStorage.setItem('loggeOnUser', angular.toJson(loggedOnUser));
          refreshSession();
      }

      function clearLoggedOnUser() {
          loggedOnUser = null;
          session = null;
          localStorage.removeItem('consoleSession');
          localStorage.removeItem('loggedOnUser');
      }

      return {
          login: function(loginCredentials, onSuccess, onError) {
              const encodedCredentials = Base64.encode(loginCredentials.username + ':' + loginCredentials.password);
              $http.defaults.headers.common.authorization = 'Basic ' + encodedCredentials;
              Api.User.get({}, function(user) {
                  setLoggedOnUser(user);
                  onSuccess(user);
              }), function(error) {
                  $rootscope.user = {};
                  onError(error.statusCode);
              }
          }
      }
  });