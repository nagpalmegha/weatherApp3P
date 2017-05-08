'use strict';
var weatherapp = angular.module('app', []);
weatherapp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://api.openweathermap.org/**'
  ]);
});


