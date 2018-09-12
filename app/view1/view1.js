'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$http','$cacheFactory', function ($scope, $http, $cacheFactory ) {
    var cache = $cacheFactory('myCache');
    var cachekey = 0;
    var httpCache = $cacheFactory.get('$http');

    $scope.city = '';
    $scope.zip = '';
    $scope.weather = '';
    $scope.showStats = false;
    $scope.fromCache = false;

    $scope.getByCity = function () {
      $http.get("https://api.openweathermap.org/data/2.5/weather?q=" + $scope.city + ",us&appid=a393184f2f8f7753d61a935ce03e38aa").success(function (response) {
        console.log(response)
         //do some math to convert temp from kelvin to farenheit and then reduce decimal points
         response = ConvertTemperaturesFromKelvin(response);
        $scope.weather = response;
        $scope.showStats = true;

      }).error(function(error){
        $scope.showStats = false;
        console.log(error)
        alert('Sorry, it seems that is not a real US City.');
    });
    }

   

    $scope.checkCache = function(){
      let temp =httpCache.get("https://api.openweathermap.org/data/2.5/weather?zip="+$scope.zip+",us&appid=a393184f2f8f7753d61a935ce03e38aa");
      if(temp == undefined) {
        $scope.getbyzip();
        $scope.fromCache = false;
      }
      else{
       let temporary = JSON.parse(temp[1]);
       temporary = ConvertTemperaturesFromKelvin(temporary);
       $scope.weather = temporary;
       $scope.showStats = true;
       $scope.fromCache = true;
      }
    }

    $scope.getbyzip = function () {
      $http.get("https://api.openweathermap.org/data/2.5/weather?zip="+$scope.zip+",us&appid=a393184f2f8f7753d61a935ce03e38aa", {
        cache: true
      }).success(function (response) {
        console.log(response)
        
        //do some math to convert temp from kelvin to farenheit and then reduce decimal points
        response = ConvertTemperaturesFromKelvin(response);
        $scope.weather = response;
        $scope.showStats = true;
      }).error(function(error){
        $scope.showStats = false;
        console.log(error);
        alert('Sorry, it seems that is not a real US zip.');
    });
    }

    function ConvertTemperaturesFromKelvin(obj){
      obj.main.temp = 1.8 * (obj.main.temp - 273.15) + 32;
      obj.main.temp_min = 1.8 * (obj.main.temp_min - 273.15) + 32;
      obj.main.temp_max = 1.8 * (obj.main.temp_max - 273.15) + 32;
      obj.main.temp_max = obj.main.temp_max.toFixed(2);
      obj.main.temp_min = obj.main.temp_min.toFixed(2);
      obj.main.temp = obj.main.temp.toFixed(2);
      return obj;
    }

    



  }]);