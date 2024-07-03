const apikey = "9527cc54c898c48143407d26f3df2d42";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

      const srchBox = document.querySelector(".search input");
      const btn = document.querySelector(".search .icon");
      const weatherIcon = document.querySelector(".weather-icon");

      async function checkWeather(city) {

        console.log(`Fetching weather for city: ${city}`);

        const response = await fetch(apiUrl + city + `&appid=${apikey}`);

        console.log(`Response status: ${response.status}`);

        if (response.status == 404) {
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
        } else {
          const data = await response.json();
          console.log(data);

          document.querySelector(".city").textContent = data.name;
          document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
          document.querySelector(".humidity").textContent = data.main.humidity + "%";
          document.querySelector(".wind").textContent = data.wind.speed + "km/h";

          if (data.weather[0].main == "Clouds") {

            weatherIcon.src = "resources/clouds.png";

          } else if (data.weather[0].main == "Clear") {

            weatherIcon.src = "resources/clear.png";

          } else if (data.weather[0].main == "Rain") {

            weatherIcon.src = "resources/rain.png";

          } else if (data.weather[0].main == "Drizzle") {

            weatherIcon.src = "resources/drizzle.png";

          } else if (data.weather[0].main == "Mist") {
            
            weatherIcon.src = "resources/mist.png";
          }

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
        }
      }

      btn.addEventListener("click", () => {
        checkWeather(srchBox.value);
      });

      // Optional: Trigger weather check on pressing "Enter"
      srchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          checkWeather(srchBox.value);
        }
      });