function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//

function convert(event) {
 if (event.currentTarget.checked) {
   
    cTemp.innerHTML=  `${cToF(cTemp.innerHTML)}°`;
    cForecastTemp1.innerHTML=  `${cToF(cForecastTemp1.innerHTML)}°`;
    cForecastTemp2.innerHTML=  `${cToF(cForecastTemp2.innerHTML)}°`;
    cForecastTemp3.innerHTML=  `${cToF(cForecastTemp3.innerHTML)}°`;
    cForecastTemp4.innerHTML=  `${cToF(cForecastTemp4.innerHTML)}°`;
    cForecastTemp5.innerHTML=  `${cToF(cForecastTemp5.innerHTML)}°`;
  } else {
    
    cTemp.innerHTML = `${fToC(cTemp.innerHTML)}°`;
    cForecastTemp1.innerHTML=  `${fToC(cForecastTemp1.innerHTML)}°`;
    cForecastTemp2.innerHTML=  `${fToC(cForecastTemp2.innerHTML)}°`;
    cForecastTemp3.innerHTML=  `${fToC(cForecastTemp3.innerHTML)}°`;
    cForecastTemp4.innerHTML=  `${fToC(cForecastTemp4.innerHTML)}°`;
    cForecastTemp5.innerHTML=  `${fToC(cForecastTemp5.innerHTML)}°`;
 }
}


//

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  weeklyForecast();

}

//

function nowTime(today, minutes) {
  let hour = today.getHours();

  let currentHour = document.querySelector(".hour");
  currentHour.innerHTML = hour;
  let currentMinute = document.querySelector(".minutes");
  currentMinute.innerHTML = minutes;
}

//

function nowDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let currentDay = document.querySelector(".date");
  currentDay.innerHTML = day;
}

//

function cToF(celsius) {
  celsius = celsius.replace("°", "");
  var cTemp = celsius;
  var cToFahr = Math.round((cTemp * 9) / 5 + 32);
  return cToFahr;
}

//

function fToC(fahrenheit) {
  var fTemp = fahrenheit.replace("°", "");
  var fToCel = Math.round(((fTemp - 32) * 5) / 9);
  return fToCel;
}

//

function searchingCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  weeklyForecast();
 

  let apiKey = "45ff9490c9dd41e395895840259bf64e";
  let apiUrlCitNam = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCitNam).then(showTemp);
  axios.get(apiUrlCitNam).then(showCondition);
  axios.get(apiUrlCitNam).then(showImage);
  axios.get(apiUrlCitNam).then(showForecast);
  axios.get(apiUrlCitNam).then(showHumid);
  axios.get(apiUrlCitNam).then(showWind);
}

//

function showCity(response) {
  let name = response.data.city.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = name;
}

//

function showCondition(response) {
  let desc = response.data.list[0].weather[0].description;
  let h3 = document.querySelector("#condition");
  h3.innerHTML = desc;
}

//

function showForecast(response) {
  let icon1 = response.data.list[8].weather[0].icon;
  let icon2 = response.data.list[16].weather[0].icon;
  let icon3 = response.data.list[24].weather[0].icon;
  let icon4 = response.data.list[32].weather[0].icon;
  let icon5 = response.data.list[39].weather[0].icon;
  let d1 = document.querySelector("#icon1");
  d1.setAttribute("src", `https://openweathermap.org/img/wn/${icon1}@2x.png`);
  let d2 = document.querySelector("#icon2");
  d2.setAttribute("src", `https://openweathermap.org/img/wn/${icon2}@2x.png`);
  let d3 = document.querySelector("#icon3");
  d3.setAttribute("src", `https://openweathermap.org/img/wn/${icon3}@2x.png`);
  let d4 = document.querySelector("#icon4");
  d4.setAttribute("src", `https://openweathermap.org/img/wn/${icon4}@2x.png`);
  let d5 = document.querySelector("#icon5");
  d5.setAttribute("src", `https://openweathermap.org/img/wn/${icon5}@2x.png`);

  let temp1 = Math.round(response.data.list[8].main.temp);
  let temp2 = Math.round(response.data.list[16].main.temp);
  let temp3 = Math.round(response.data.list[24].main.temp);
  let temp4 = Math.round(response.data.list[32].main.temp);
  let temp5 = Math.round(response.data.list[39].main.temp);
  let t1 = document.querySelector(".forecastTemp1");
  t1.innerHTML = temp1 + "°";
  let t2 = document.querySelector(".forecastTemp2");
  t2.innerHTML = temp2 + "°";
  let t3 = document.querySelector(".forecastTemp3");
  t3.innerHTML = temp3 + "°";
  let t4 = document.querySelector(".forecastTemp4");
  t4.innerHTML = temp4 + "°";
  let t5 = document.querySelector(".forecastTemp5");
  t5.innerHTML = temp5 + "°";
}

function showImage(response) {
  let icon = response.data.list[0].weather[0].icon;
  let dailyImg = document.querySelector("#todayImage");
  dailyImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

//

function showHumid(response) {
  let humidData = response.data.list[0].main.humidity;
  let humidity = document.querySelector(".humid");
  humidity.innerHTML = "Humidity  -  " + humidData + "%";
}

//

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "45ff9490c9dd41e395895840259bf64e";
  let apiUrlCurLoc = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurLoc).then(showTemp);
  axios.get(apiUrlCurLoc).then(showCity);
  axios.get(apiUrlCurLoc).then(showCondition);
  axios.get(apiUrlCurLoc).then(showForecast);
  axios.get(apiUrlCurLoc).then(showImage);
  axios.get(apiUrlCurLoc).then(showHumid);
  axios.get(apiUrlCurLoc).then(showWind);
}

//

function showTemp(response) {
  let temperatureCel = Math.round(response.data.list[0].main.temp);
  let cityTemp = document.querySelector(".temp");
  cityTemp.innerHTML = temperatureCel + "°";
  console.log(response);
}

//

function showWind(response) {
  let windData = Math.round(response.data.list[0].wind.speed);
  let wind = document.querySelector(".wind");
  wind.innerHTML = "Wind Speed  -  " + windData + "  km/h";
  1;
}

//

function weeklyForecast() {
  let today = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day1 = days[(today.getDay() + 1) % 7];
  let forecast1 = document.querySelector(".forecast1");
  forecast1.innerHTML = day1;

  let day2 = days[(today.getDay() + 2) % 7];
  let forecast2 = document.querySelector(".forecast2");
  forecast2.innerHTML = day2;

  let day3 = days[(today.getDay() + 3) % 7];
  let forecast3 = document.querySelector(".forecast3");
  forecast3.innerHTML = day3;

  let day4 = days[(today.getDay() + 4) % 7];
  let forecast4 = document.querySelector(".forecast4");
  forecast4.innerHTML = day4;

  let day5 = days[(today.getDay() + 5) % 7];
  let forecast5 = document.querySelector(".forecast5");
  forecast5.innerHTML = day5;
}

function checkboxReset(event) {
  document.getElementById("checkbox").checked = false;
}
//

/* Variables*/

//

let cTemp = document.querySelector(".temp");
let cForecastTemp1 = document.querySelector(".forecastTemp1");
let cForecastTemp2 = document.querySelector(".forecastTemp2");
let cForecastTemp3 = document.querySelector(".forecastTemp3");
let cForecastTemp4 = document.querySelector(".forecastTemp4");
let cForecastTemp5 = document.querySelector(".forecastTemp5");

let dateTime = new Date();
let minutes = addZero(dateTime.getMinutes());

let searchCity = document.querySelector("#location");
searchCity.addEventListener("submit", searchingCity);
searchCity.addEventListener("submit", checkboxReset);

let curLoc = document.querySelector("button");
curLoc.addEventListener("click", currentLocation);
curLoc.addEventListener("click", checkboxReset);

let convertFC = document.querySelector("input#checkbox");
convertFC.addEventListener("change", convert);

nowTime(dateTime, minutes);
nowDate(dateTime);