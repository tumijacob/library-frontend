angular.module('library')
    .controller('LoginCtrl', function ($scope, $location, AuthService) {
        console.log("I am working");
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function (credentials, loginForm) {
            // if (credentials.username === 'Tumi' && credentials.password === '1234') {
            //     console.log("success");
            // //     $location.path('/home');
            // }
            if (loginForm.$valid) {
                AuthService.login(credentials, function () {
                    $scope.invalidLogin = false;
                    $scope.credentials.username = null;
                    $scope.credentials.password = null;
                    loginForm.$setpristine();
                    $location.path('/home');
                }, function(statusCode) {
                    if (statusCode === 401) {
                        $scope.loginAlert = "Invalid username/password";
                    }
                    if (statusCode === 0 || statusCode === 500) {
                        $scope.loginAlert = "Connection lost please try again";
                    }
                });
            } else {
                $scope.invalidLogin = true;
            }
        }

    });