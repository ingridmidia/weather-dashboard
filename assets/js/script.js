var initialForm = document.getElementById("initial-form");

initialForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var cityInput = document.getElementById("city-input").value;
    localStorage.setItem("city", cityInput);
    
    window.location.href = "./dashboard.html";
});