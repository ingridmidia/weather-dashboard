function searchCityWeather() {// TODO: add throw and catch

    var city = localStorage.getItem("city");
    console.log(city);

    var geocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=8db3ecd3755c3cb6724d4b46e2a83323";

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
                    var cityInfo = document.getElementById("city-info");
                    cityInfo.textContent = data.name + " " + formatedDate();
                    var icon = data.weather[0].icon;
                    renderIcon(icon, "today-icon");
                    var todayTemp = document.getElementById("today-temp");
                    todayTemp.textContent = "Temp: " + data.main.temp + "°F"
                    var todayWind = document.getElementById("today-wind");
                    todayWind.textContent = "Wind: " + data.wind.speed + " MPH";
                    var todayHumidity = document.getElementById("today-humidity");
                    todayHumidity.textContent = "Humidity: " + data.main.humidity+ "%";
                    console.log(data.wind.speed);
                    console.log(data.main.humidity);
                });
            var fiveDaysWeatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8db3ecd3755c3cb6724d4b46e2a83323";
            fetch(fiveDaysWeatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (var i = 4; i < data.list.length; i += 8) { // picks forecast at noon
                        console.log(data.list[i].dt);// TODO: fix date
                        //data.list[i].weather[0].icon
                        console.log(data.list[i].main.temp);
                        console.log(data.list[i].wind.speed);
                        console.log(data.list[i].main.humidity);
                    }
                })
        });
}

searchCityWeather();

// https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
function formatedDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var today = `(${month}/${day}/${year})`;
    return today;
}

function renderIcon(icon, id) {
    var weatherIconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
    console.log(weatherIconUrl);
    var iconImg = document.getElementById(id);
    iconImg.src = weatherIconUrl;
}

