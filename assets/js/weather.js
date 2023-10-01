// display 5 day forecast for the city passed in query parameter
function searchCityWeather() {

    var city = document.location.search.split("=")[1];

    var geocodingApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=8db3ecd3755c3cb6724d4b46e2a83323";

    // get latitude and longitude data based on city name
    fetch(geocodingApiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            // use latitude and longitude to fetch current weather
            var currentDayWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8db3ecd3755c3cb6724d4b46e2a83323";
            fetch(currentDayWeatherApiUrl)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then(function (data) {
                    var cityInfo = document.getElementById("city-info");
                    var normalDate = new Date(data.dt * 1000);// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
                    var date = formatedDate(normalDate);
                    cityInfo.textContent = data.name + " (" + date + ")";

                    addToSearchHistory(data.name);// save on history if city searched by user is found on API

                    var icon = data.weather[0].icon;
                    var weatherIconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
                    var iconImg = document.getElementById("today-icon");
                    iconImg.src = weatherIconUrl;

                    var todayTemp = document.getElementById("today-temp");
                    todayTemp.textContent = "Temp: " + data.main.temp + "°F"
                    var todayWind = document.getElementById("today-wind");
                    todayWind.textContent = "Wind: " + data.wind.speed + " MPH";
                    var todayHumidity = document.getElementById("today-humidity");
                    todayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                });

            // use latitude and longitude to fetch 5 day weather
            var fiveDaysWeatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8db3ecd3755c3cb6724d4b46e2a83323";
            fetch(fiveDaysWeatherApiUrl)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then(function (data) {
                    // increments in 8 because api returns forecast for every 3 hours
                    for (var i = 0; i < data.list.length; i += 8) {
                        var futureDay = data.list[i];
                        renderForecastBoxes(futureDay);
                    }
                })
        })
        .catch(function () {
            displayHistory();
            alert("Sorry, could not retrieve weather information");
        });
}

searchCityWeather();

// https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
function formatedDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = `${month}/${day}/${year}`;
    return today;
}
// dinamically creates HTML elements for 5 day forecast
function renderForecastBoxes(futureDay) {
    var forecastBoxes = document.getElementById("forecast-boxes");
    var forecastBox = document.createElement("section");
    var date = document.createElement("p");
    var iconImg = document.createElement("img");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");

    var normalDate = new Date(futureDay.dt * 1000);// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

    date.textContent = formatedDate(normalDate);

    var icon = futureDay.weather[0].icon;
    var weatherIconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
    iconImg.src = weatherIconUrl;

    temp.textContent = "Temp: " + futureDay.main.temp + "°F";
    wind.textContent = "Wind: " + futureDay.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + futureDay.main.humidity + "%";

    forecastBoxes.appendChild(forecastBox);
    forecastBox.classList.add("col-2");
    forecastBox.classList.add("m-3");
    forecastBox.classList.add("forecast-box");
    forecastBox.appendChild(date);
    forecastBox.appendChild(iconImg);
    forecastBox.appendChild(temp);
    forecastBox.appendChild(wind);
    forecastBox.appendChild(humidity);
}

var searchForm = document.getElementById("search-form");
// redirects to searched city dashboard
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var cityInput = document.getElementById("city-input").value;

    var url = "./dashboard.html?q=" + cityInput;
    location.assign(url);
});

// save searched city to local storage
function addToSearchHistory(city) {
    var cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
    }

    localStorage.setItem("cities", JSON.stringify(cities));
    displayHistory();
}

// dinamically creates HTML elements for search history
function displayHistory() {
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    for (var i = 0; i < cities.length; i++) {
        var searchHistory = document.getElementById("search-history");
        var button = document.createElement("button");
        button.textContent = cities[i];
        searchHistory.classList.add("d-grid");
        button.classList.add("btn");
        button.classList.add("btn-secondary");
        button.classList.add("m-1");
        searchHistory.appendChild(button);
        button.addEventListener("click", function (event) {
            var url = "./dashboard.html?q=" + event.target.innerText;
            location.assign(url);
        });
    }
}

