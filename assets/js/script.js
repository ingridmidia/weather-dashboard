var initialForm = document.getElementById("initial-form");


initialForm.addEventListener("submit", searchCity);

function searchCity(event) { // TODO:add throw and catch
    event.preventDefault();

    var cityInput = document.getElementById("city-input").value;
    console.log(cityInput);

    var geocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=8db3ecd3755c3cb6724d4b46e2a83323";

    fetch(geocodingApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            var lat = data[0].lat;
            var lon = data[0].lon;
            var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8db3ecd3755c3cb6724d4b46e2a83323";
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data.name);
                    console.log(data.main.temp);
                    console.log(data.wind.speed);
                    console.log(data.main.humidity);
                })
        })
}