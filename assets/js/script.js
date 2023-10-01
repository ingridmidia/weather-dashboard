var initialForm = document.getElementById("initial-form");

initialForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var cityInput = document.getElementById("city-input").value;

    var url = "./dashboard.html?q=" + cityInput;
    location.assign(url);
});

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

displayHistory();