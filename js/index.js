var scriptloaded = 0;

document.addEventListener("DOMContentLoaded", function () {

    //Displays the current date depending on what day it is. Current Date Object displaying date/month/Year.

    var currDate = new Date();
    var currDate = ' ' + currDate.getDate() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear();

    //App weather ID for the weather app
    var appID = "&APPID=f74316dbe7442f12d602b1cae1a5172b";
    var city;
    var state;
    var fahrenheit = "&units=imperial";
    var temp;

    //JSON Request for IP Location.

    var jsonUrl = 'http://ip-api.com/json'
    var getIpLoc = function (json) {
        var country = json.country;
        var countryCode = json.countryCode;
        var city = json.city;
        var lat = json.lat;
        var lon = json.lon;
        $('#location').text(city + ', ' + country).css('font-size', '2.5vw').css('color');
       
        //This code fetchs the JSON data from the api Weather Data.

        var jsonUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "" + appID;
   var getWeather = function (json) {
           var loc = json.name;
           var cond = json.weather[0].main;
           var tempK = json.main.temp;
           var tempC = Math.round(tempK - 273.15);
           var tempF = Math.round((tempK * 1.8) - 459.67);
           var wind = json.wind.speed;
           var humid = json.main.humidity;
           $('#tempC').text(tempC + ' ').append('<i class="unit wi wi-celsius"></i>');
           $('#tempF').text(tempF + ' ').append('<i class="unit wi wi-fahrenheit"></i>');
           $('#cond').text(cond);
           /*$('#weather-icon').addClass('wi wi-day-cloudy');*/
           $('#wind').text(' ' + wind + ' ms').prepend('<i class="wi wi-strong-wind"></i>');
           $('#humidity').text(' ' + humid + ' %').prepend('<i class="wi wi-humidity"></i>');
           $('#date').text(currDate).prepend('<i class="fa fa-calendar"></i>');
           $('.unit').mouseenter(function () {
               $(this).css('color', '#2E2EFE');
           }).mouseleave(function () {
               $(this).css('color', '#4D50C8');
           });
           $('.unit').click(function () {
               $('.temp').slideToggle('medium');
           });
            
            // I used a switch/case method to switch betwwen icon for the weather determined on the forecast for that day.
            switch (cond) {
            case 'Clouds':
                $('#weather-icon').addClass('wi wi-cloudy');
                break;
            case 'Clear':
                $('#weather-icon').addClass('wi wi-day-sunny');
                break;
            case 'Snow':
                $('#weather-icon').addClass('wi wi-snow');
                break;
            case 'Rain':
                $('#weather-icon').addClass('wi wi-rain');
                break;
            case 'Drizzle':
                $('#weather-icon').addClass('wi wi-sprinkle');
                break;
            case 'Thunderstorm':
                $('#weather-icon').addClass('wi wi-thunderstorm');
                break;
            case 'Mist':
                $('#weather-icon').addClass('wi wi-fog');
                break;
            case 'Fog':
                $('#weather-icon').addClass('wi wi-fog');
                break;
            };
       
       
        };
        $.getJSON(jsonUrl, getWeather, 'json');
    };
    $.getJSON(jsonUrl, getIpLoc, 'json');
});    
        
      