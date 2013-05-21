'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
.filter('decode', function() {
    return function(text) {
		console.log(text);
		console.log($.parseJSON(text));
      return $.parseJSON(text);
    }
  });