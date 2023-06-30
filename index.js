function whatDayIsIt() {
  let now = new Date();

  let date = now.getDate();
  let day = now.getDay();
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  day = weekDays[day];

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let elaborateNow = `${day}, ${hours}:${minutes}`;

  let currentDate = document.querySelector("#current__date");
  currentDate.innerHTML = elaborateNow;
}
whatDayIsIt();
setInterval(whatDayIsIt, 60000);

let currentCity = document.querySelector(".current__title");
let searchForm = document.querySelector(".searcher");

searchForm.addEventListener("submit", updateCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector(".current__title");
  h1.innerHTML = ` ${response.data.name}`;
  let tmp = document.querySelector("#Cdegree");
  tmp.innerHTML = `${temperature}`;
}

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let city = searchInput.value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  currentCity.innerHTML = city;
}

function showWeather(response) {
  let h1 = document.querySelector(".current__title");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;
  let tmp = document.querySelector("#Cdegree");
  tmp.innerHTML = `${temperature}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCity() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let btn = document.querySelector("#current");
btn.addEventListener("click", getCity);
