let key = "a05e5c99e9980dcaaaf6a16f4d89a422";
let mapKey = "AIzaSyBPBMWI1xs_di9e4cftjnzNFK2P4_-w908";

async function getWeather() {
  try {
    let city = document.getElementById("name").value;

    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    let response = await fetch(url1);
    let data = await response.json();

    let lat = data.coord.lat;
    let lon = data.coord.lon;

    let url3 = `https://www.google.com/maps/embed/v1/search?key=${mapKey}&q=${city}`;

    document.querySelector("iframe").src = url3;

    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    let response1 = await fetch(url2);
    let data1 = await response1.json();

    displayWeather(data1.daily);
  } catch (error) {
    alert("Please Enter correct City Name");
  }
}

let wall = document.getElementById("daily");

let div = document.createElement("div");
div.id = "dailydata";

function displayWeather(daily) {
  wall.innerText = "";

  daily.map(function (item) {
    let dt = new Date(item.dt * 1000);
    let div = document.createElement("div");
    div.id = "dailydata";

    let date = document.createElement("h3");
    date.innerHTML = `${dt.toDateString()}`;

    let min = document.createElement("p");
    min.innerText = `Min Temp: ${Math.round(item.temp.min)}º`;

    let max = document.createElement("p");
    max.innerText = `Max Temp: ${Math.round(item.temp.max)}º`;

    let icon = document.createElement("img");
    if (item.weather[0].id === 800) {
      icon.src = "weatherImages/clear.png";
    } else if (item.weather[0].id === 802) {
      icon.src = "weatherImages/cloud1.png";
    } else if (item.weather[0].id === 803) {
      icon.src = "weatherImages/cloud2.png";
    } else if (item.weather[0].id === 200 || item.weather[0].id < 233) {
      icon.src = "weatherImages/thunderstrom.png";
    } else if (item.weather[0].id === 300 || item.weather[0].id < 322) {
      icon.src = "weatherImages/drizzle.png";
    } else if (item.weather[0].id === 500 || item.weather[0].id < 512) {
      icon.src = "weatherImages/rainy.png";
    } else if (item.weather[0].id === 520 || item.weather[0].id < 532) {
      icon.src = "weatherImages/rain.png";
    } else if (item.weather[0].id === 600 || item.weather[0].id < 623) {
      icon.src = "weatherImages/snow.png";
    } else if (item.weather[0].id === 700 || item.weather[0].id < 782) {
      icon.src = "weatherImages/mist.png";
    } else if (item.weather[0].id === 801 || item.weather[0].id < 805) {
      icon.src = "weatherImages/clouds.png";
    }

    div.append(date, icon, min, max);
    wall.append(div);
  });
}
