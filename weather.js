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

    displayCurrentTemp(data1);
    displayWeather(data1.daily);
  } catch (error) {
    alert("Please Enter correct City Name");
  }
}

function displayCurrentTemp(data) {
  let div = document.getElementById("currentTemp");
  div.innerText = "";

  let temp = document.createElement("h1");
  temp.innerText = `Current Temp: ${data.current.temp}ºC`;

  div.append(temp);
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

    let day = getkeyByValue(days, dt.toDateString().split(" ")[0]);

    let date = document.createElement("h3");
    date.innerHTML = day;

    let date2 = document.createElement("h3");
    date2.innerHTML = `${dt.toDateString().split(" ")[2]} ${
      dt.toDateString().split(" ")[1]
    }`;

    let min = document.createElement("p");
    min.innerText = `Min Temp: ${Math.round(item.temp.min)}ºC`;

    let max = document.createElement("p");
    max.innerText = `Max Temp: ${Math.round(item.temp.max)}ºC`;

    let icon = document.createElement("img");

    let id = item.weather[0].id;

    getIcon(id, icon);

    div.append(date, date2, icon, min, max);
    wall.append(div);
  });
}

let days = {
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};

function getkeyByValue(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

function getIcon(id, icon) {
  if (id === 800) {
    icon.src = "weatherImages/clear.png";
  } else if (id === 802) {
    icon.src = "weatherImages/cloud1.png";
  } else if (id === 803) {
    icon.src = "weatherImages/cloud2.png";
  } else if (id === 200 || id < 233) {
    icon.src = "weatherImages/thunderstrom.png";
  } else if (id === 300 || id < 322) {
    icon.src = "weatherImages/drizzle.png";
  } else if (id === 500 || id < 512) {
    icon.src = "weatherImages/rainy.png";
  } else if (id === 520 || id < 532) {
    icon.src = "weatherImages/rain.png";
  } else if (id === 600 || id < 623) {
    icon.src = "weatherImages/snow.png";
  } else if (id === 700 || id < 782) {
    icon.src = "weatherImages/mist.png";
  } else if (id === 801 || id < 805) {
    icon.src = "weatherImages/clouds.png";
  }
}
