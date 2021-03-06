'use strict';

weatherapp.service('weatherService', function () {
    //to create unique newWeatherCollection id
    var uid = 1;   
    //weatherCollection array to hold list of all weather citis
    var weatherCollection = [];
    //save method create a new newWeatherCollection if not already exists
    //else update the existing object
    this.save = function (newWeatherCollection) {

        if (newWeatherCollection.id === null) {
            //if this is newWeatherCollection, add it in weatherCollection array
            newWeatherCollection.id = uid++;
				
            weatherCollection.push(newWeatherCollection);
        } else {
            //for existing newWeatherCollection, find this newWeatherCollection using id
            //and update it.
            for (var i in weatherCollection) {
                if (weatherCollection[i].id == newWeatherCollection.id) {
                    weatherCollection[i] = newWeatherCollection;
                }
            }
        }
    };
    //simply search weatherCollection list for given id
    //and returns the newWeatherCollection object if found
    this.get = function (id) {
        for (var i in weatherCollection) {
            if (weatherCollection[i].id == id) {
                return weatherCollection[i];
            }
        }

    };
    //simply returns the weatherCollection list
    this.list = function () {
        return weatherCollection;
    };
});


weatherapp.factory('weatherFactory', function ($http) {
  return {
    getWeather : function (city, callback) 
	{	
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city+'&APPID=271e4ad819c0d4b4d7ee4338aa5c2845';
		$http.get(url, {json_callback: 'JSON_CALLBACK'}).then(
		
		function(response) {
			callback({
				city : response.data.name,
				temp : Math.floor(response.data.main.temp*(9/5)-459.67),
				currentCondition : response.data.weather[0].main
			});
       },
	   // Handle error
		function(error) {			
			document.getElementById('formError').innerHTML= "City cannot be found";
		//error code
		});
    }
  };
});