describe('weatherController', function () {

  // load the controller's module
  beforeEach(module('app'));

  var weatherController, scope, $httpBackend, weatherService, weatherFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, weatherService, weatherFactory) {

          // place here mocked dependencies
      $httpBackend = _$httpBackend_;

     $httpBackend.when('GET',
      'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=271e4ad819c0d4b4d7ee4338aa5c2845')
      .respond(
        {"coord":{"lon":-0.13,"lat":51.51},
		"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
		"base":"stations",
		"main":{"temp":288.4,"pressure":1021,"humidity":54,"temp_min":286.15,"temp_max":290.15},
		"visibility":10000,
		"wind":{"speed":4.1,"deg":340},"clouds":{"all":75},"dt":1494165000,
		"sys":{"type":1,"id":5091,"message":0.0081,"country":"GB","sunrise":1494130822,"sunset":1494185684},
		"id":2643743,
		"name":"London",
		"cod":200}
      );

    scope = $rootScope.$new();
    weatherController = $controller('weatherController', {
      $scope: scope, weatherService: weatherService, weatherFactory:weatherFactory
    });
          
  }));
  
 
  it('should check if getWeather method is defined', inject(function(weatherFactory) {
    expect(weatherFactory.getWeather).toBeDefined();
  }));
  
  it('should check if a value is returned', inject(function(weatherFactory) {
    console.log('fn definition:', weatherFactory.getWeather);
    weatherFactory.getWeather('London',function(data) {
      expect(data).not.toBe(null);
    });
    $httpBackend.flush();
  }));
  
  it('should check if a London is returned as city', inject(function(weatherFactory) {
    weatherFactory.getWeather('London', function(data) {
      expect(data.city).toEqual('London');
    });
    $httpBackend.flush();
  }));
  
  it('should make a call to the api', inject(function(weatherFactory) {
    weatherFactory.getWeather('London', function(data) {
      console.log(data.temp)
      expect(data.temp).toEqual(59);
    });
    $httpBackend.flush();
  }));
  
 });
 


