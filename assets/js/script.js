var initialForm = document.getElementById("initial-form");


initialForm.addEventListener("submit", searchCityWeather);

function searchCityWeather(event) {// TODO: add throw and catch
    event.preventDefault();

    var cityInput = document.getElementById("city-input").value;

    var geocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=8db3ecd3755c3cb6724d4b46e2a83323";

    fetch(geocodingApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var currentDayWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8db3ecd3755c3cb6724d4b46e2a83323";
            fetch(currentDayWeatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data.name);
                    // TODO: insert date
                    // Icon data.weather[0].icon
                    console.log(data.main.temp);
                    console.log(data.wind.speed);
                    console.log(data.main.humidity);
                });
            var fiveDaysWeatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8db3ecd3755c3cb6724d4b46e2a83323";
            fetch(fiveDaysWeatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    for (var i = 4; i < data.list.length; i+=8) { // picks forecast at noon
                        console.log(data.list[i].dt);// TODO: fix date
                        //data.list[i].weather[0].icon
                        console.log(data.list[i].main.temp);
                        console.log(data.list[i].wind.speed);
                        console.log(data.list[i].main.humidity);
                    }
                })
        });
}