let inputValCity = document.getElementById("city");
const showData = document.getElementById("showWeather");
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weatherType')
const weatherDesc = document.getElementById('weatherDesc')
const country = document.getElementById('country')

window.onload = () => {
  getCity();
}

function getCity() {
  $.ajax({
    url: "https://ipinfo.io/json",
    beforeSend: function () {
      $("#city").attr("placeholder", "Detecting your city...");
    },
    success: function (data) {
      $("#city").val(data.city);
      getWeather();
    },
    complete: function () {
      $("#city").attr("placeholder", "Enter your city name");
    },
    dataType: "JSON"
  });
}


let weatherBtn = document
  .querySelector("button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    getWeather();
  });


function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValCity.value}&appid=131c028170b0cf867703265c71524ce8`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      try {
        //for temp
        temp.innerHTML = data.main.temp

        //for weather type
        weatherType.innerHTML = data.weather.map((weatherTypes => weatherTypes.main))

        //for weather description
        weatherDesc.innerHTML = data.weather.map(weatherTypes => weatherTypes.description)

        //for country
        country.innerHTML = data.sys.country
      }
      catch (err) {
        alert("Please enter city name correctly or something went wrong from our side. Soryy for inconvenience.")
      }
    });
}