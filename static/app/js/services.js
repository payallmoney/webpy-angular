'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).factory('loginService', function() {
    var loginService = {};
    loginService.setUser = function(user) {
        loginService.user=user;
    };
    return loginService;
});;
