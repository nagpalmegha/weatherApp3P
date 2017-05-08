'use strict';

weatherapp.controller('weatherController', function ($scope, weatherService, weatherFactory) {

    $scope.weatherCollection = weatherService.list();

    $scope.saveContact = function () 
		{
			weatherFactory.getWeather($scope.newWeatherCollection.city,function(data) {
			$scope.newWeatherCollection.tmp = data.temp;
			$scope.newWeatherCollection.city = data.city;
			$scope.newWeatherCollection.description = data.currentCondition;
			$scope.newWeatherCollection.id=null;
			weatherService.save($scope.newWeatherCollection);			
			$scope.newWeatherCollection = {};
		});
    };
});
