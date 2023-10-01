var initialForm = document.getElementById("initial-form");

initialForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var cityInput = document.getElementById("city-input").value;

    var url = "./dashboard.html?q=" + cityInput;
    location.assign(url);
});