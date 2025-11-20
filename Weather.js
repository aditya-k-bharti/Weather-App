// Weather App JavaScript

class WeatherApp{
  constructor(){
    this.currentLanguage = 'en';  //Default to English
    this.translations = {
      hi: {
        loading: 'मौसम डेटा लोड हो रहा है...',
        pleaseWait: 'कृपया प्रतीक्षा करे',
        searchWeather: 'मौसम खोजे',
        myLocation: '📍 मेरा स्थान',
        enterCity: 'कृपया शहर का नाम दर्ज करे',
        searching: '⌛ खोज रहे है...',
        gettingLocation: '⌛ Location प्राप्त कर रहे है...',
        feelsLike: 'महसूस होता है',
        windSpeed: 'हवा की गति',
        humidity: 'नमी',
        visibility: 'दृशियता',
        pressure: 'दबाव',
        forecast5Day: '5-दिन का पुर्वामान',
        cityNotFound: 'शहर नहीं मिला। कृपया पुनः प्रयास करे।',
        geoLocationNotSupported: 'Geolocation इस browser में supported नहीं है',
        locationError: 'आपका location प्राप्त नहीं हो सका। कृपया manually search करे',
        yourLocation: 'आपका स्थान',
        days: ['आज', 'कल', 'बुधवार', 'गुरुवार', 'शुक्रवार'],
        weatherConditions: {
          0: 'साफ आसमान',
          1: 'मुख्यतः साफ',
          2: 'आंशिक बादल',
          3: 'बादल छाए हुए है',
          45: 'कोहरा',
          48: 'जमा हुआ कोहरा',
          51: 'हल्की बूंदाबांदी',
          53: 'मध्यम बारिश',
          55: 'तेज बुदाबंदी',
          61: 'हल्की बारिश',
          63: 'मध्यम बारिश',
          65: 'तेज बारिश',
          71: 'हल्की बर्फबारी',
          73: 'मध्यम बर्फबारी',
          75: 'तेज बर्फबारी',
          95: 'तूफ़ान'
        },
        appTitle: 'मौसम ऐप',
        appSubtitle: 'किसी भी स्थान के लिए real-time मौसम अपडेट प्राप्त करे',
        cityPlaceholder: 'शहर का नाम दर्ज करे...',
        settings: 'सेटिंग्स',
        Language: 'भाषा'
      },
      en:{
        loading: 'Loading Weather Data...',
        pleaseWait: 'Please wait',
        searchWeather: 'Search Weather',
        myLocation: '📍 My Location',
        enterCity: 'Please enter city name',
        searching: '⌛ Searching...',
        gettingLocation: '⌛ Getting Location...',
        feelsLike: 'Feels like',
        windSpeed: 'Wind Speed',
        humidity: 'Humidity',
        visibility: 'Vsibility',
        pressure: 'Pressure',
        forecast5Day: '5-Day Forecast',
        cityNotFound: 'City not found. Please try again.',
        geoLocationNotSupported: 'Geolocation is not supported by this browser.',
        locationError: 'Unable to get your location. Please search manually.',
        yourLocation: 'Your Location',
        days: ['Today', 'Tommorow', 'Wednesday', 'Thursday', 'Friday'],
        weatherConditions: {
          0: 'Clear Sky',
          1: 'Mainly Clear',
          2: 'Partly Cloudy',
          3: 'Overcast',
          45: 'Fog',
          48: 'Depositing Rime Fog',
          51: 'Light Drizzle',
          53: 'Moderate Drizzle',
          55: 'Dense Drizzle',
          61: 'Slight Rain',
          63: 'Moderate Rain',
          65: 'Heavy Rain',
          71: 'Slight Snow',
          73: 'Moderate Snow',
          75: 'Heavy Snow',
          95: 'Thunderstrom'
        },
        appTitle: 'Weather App',
        appSubtitle: 'Get real-time weather updates for any location',
        cityPlaceholder: 'Enter city name...',
        settings: 'Settings',
        Language: 'Language',
      }
    };
    this.init();
  }

  init(){
    this.createLanguageSettings();
    this.bindEvents();
    this.updateLanguage();
    this.loadDefaultWeather();
    setTimeout(() => {
      this.hideLoading();
    }, 1500);
  }

  createLanguageSettings(){
    const settingsHTML = `
    <div id="settingsPanel" class="fixed top-4 right-4 z-40">
      <button id="settingsBtn" class="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg">⚙️</button>

      <div id="settingsDropDown" class="hidden absolute right-0 mt-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 min-w-48">
        <h3 id="settingsTitle" class="text-white font-semibold mb-3 text-sm">Settings</h3>
        <div class="space-y-3">

          <p id="languageLabel" class="text-white/80 text-xs mb-2">Language</p>

          <div class="space-y-2">

            <label class="flex items-center text-white cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all">
              <input type="radio" name="language" value="en" class="langRadio mr-3" checked>
              <span class="text-sm">🇺🇸 English</span>
            </label>

            <label class="flex items-center text-white cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-all">
              <input type="radio" name="language" value="hi" class="langRadio mr-3">
              <span class="text-sm">🇮🇳 हिंदी</span>
            </label>

          </div>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', settingsHTML);

    // Bind settings events after DOM insertion

    setTimeout(()=>{
      const settingsBtn = document.getElementById('settingsBtn');
      const settingsDropdown = document.getElementById('settingsDropDown');
      const languageInputs = document.querySelectorAll('.langRadio');

      settingsBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        settingsDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e)=>{
        if(!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)){
          settingsDropdown.classList.add('hidden');
        }
      });

      languageInputs.forEach((radio) =>{
        radio.addEventListener('change', (e)=>{
          console.log('Language changed to:', e.target.value);
          this.currentLanguage = e.target.value;
          this.updateLanguage();
          settingsDropdown.classList.add('hidden');
        });
      });
    }, 100);
  }

  updateLanguage(){
    const t = this.translations[this.currentLanguage];
    console.log('Updating language to:', this.currentLanguage);

    // Update static text elements

    const titleElement = document.querySelector('h1');
    const subtitleElement = document.querySelector('header p');
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');

    if(titleElement){
      titleElement.innerHTML = `⛅ ${t.appTitle}`;
    }
    if(subtitleElement){
      subtitleElement.textContent = t.appSubtitle;
    }
    if(cityInput){
      cityInput.placeholder = t.cityPlaceholder;
    }
    if(searchBtn){
      searchBtn.textContent = t.searchWeather;
    }
    if(locationBtn){
      locationBtn.textContent = t.myLocation;
    }

    // Update loading text

    const loadingH2 = document.querySelector('#loading h2');
    const loadingP = document.querySelector('#loading p');

    if(loadingH2){
      loadingH2.textContent = t.loading;
    }
    if(loadingP){
      loadingP.textContent = t.pleaseWait;
    }

    // Update settings panel 

    const settingsTitle = document.getElementById('settingsTitle');
    const languageLabel = document.getElementById('languageLabel');

    if(settingsTitle){
      settingsTitle.textContent = t.settings;
    }
    if(languageLabel){
      languageLabel.textContent = t.Language;
    }

    // Update weather details labels if weather is displayed

    const weatherContainer = document.getElementById('weatherContainer');
    if(!weatherContainer.classList.contains('hidden')){
      this.updateWeatherLabels();
    }
  }

  updateWeatherLabels(){
    const t = this.translations[this.currentLanguage];

    // Update weather details labels
    
    const detailsGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
    if(detailsGrid){
      const labels = [t.windSpeed, t.humidity, t.visibility, t.pressure];
      const labelElements = detailsGrid.querySelectorAll('.text-white\\/80.text-sm');

      labelElements.forEach((element, index) =>{
        if(labels[index]){
          element.textContent = labels[index];
        }
      });
    }

    // Update forecast title

    const forecastTitle = document.querySelector('h3');
    if(forecastTitle){
      forecastTitle.textContent = t.forecast5Day;
    }

    // Update feels like text 

    const feelsLikeElement = document.getElementById('feelsLike');
    if(feelsLikeElement){
      const currentTemp = document.getElementById('temperature').textContent;
      const tempValue = parseInt(currentTemp) + 2;
      feelsLikeElement.textContent = `${t.feelsLike} ${tempValue}°`;
    }
  }

  bindEvents(){
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');
    const cityInput = document.getElementById('cityInput');

    if(searchBtn){
      searchBtn.addEventListener('click', ()=> this.searchWeather());
    }
    if(locationBtn){
      locationBtn.addEventListener('click', ()=> this.getCurrentLocationWeather());
    }

    if(cityInput){
      cityInput.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter'){
          this.searchWeather();
        }
      });
    }
  }

  hideLoading(){
    const loadingElement = document.getElementById('loading');
    if(loadingElement){
      loadingElement.style.opacity = '0';
      loadingElement.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() =>{
        loadingElement.style.display = 'none';
      }, 500);
    }
  }

  async loadDefaultWeather(){
    // Load weather for Delhi coordinates as default 

    await this.getWeatherByCoords(28.6139, 77.2090, 'Delhi');
  }

  async searchWeather(){
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    const t = this.translations[this.currentLanguage];

    if(!city){
      this.showError(t.enterCity);
      return;
    }

    this.showSearchLoading();

    try {
      // Get coordinates for city using geocoding API

      const coords = await this.getCityCoordinates(city);
      if(coords){
        await this.getWeatherByCoords(coords.lat, coords.lon, coords.name || city);
        this.hideError();
      } else{
        this.showError(t.cityNotFound);
      }
    } catch (error) {
      console.error('Error searching weather:', error);
      this.showError(t.cityNotFound);
    } finally{
      this.hideSearchLoading();
    }
  }

  async getCurrentLocationWeather(){
    const t = this.translations[this.currentLanguage];

    if(!navigator.geolocation){
      this.showError(t.geoLocationNotSupported);
      return;
    }

    this.showSearchLoading();

    navigator.geolocation.getCurrentPosition(
      async (position) =>{
        const {latitude, longitude} = position.coords;
        await this.getWeatherByCoords(latitude, longitude, t.yourLocation);
        this.hideError();
        this.hideSearchLoading();
      },
      (error) =>{
        this.hideSearchLoading();
        this.showError(t.locationError);
        console.error('Geolocation error:', error);
      }
    );
  }

  async getCityCoordinates(cityName){
    try {
      // Use OpenStreetMap Nomination API for geocoding

      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);

      if(!response.ok){
        throw new Error('Geocoding API request failed');
      }

      const data = await response.json();

      if(data && data.length > 0){
        return{
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          name: data[0].display_name.split(',')[0]  // Get city name
        };
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);

      // Fallback to predefined coordinates
      
      const cityCoords = {
        'delhi': {lat: 28.6139, lon: 77.2090},
        'mumbai': {lat: 19.0760, lon: 72.8777},
        'bangalore': {lat: 12.9716, lon: 77.5946},
        'chennai': {lat: 13.0827, lon: 80.2707},
        'kolkata': {lat: 22.5726, lon: 88.2707},
        'hyderabad': {lat: 17.3850, lon: 78.4867},
        'pune': {lat: 18.5204, lon: 73.8567},
        'ahmedabad': {lat: 23.9124, lon: 72.7873},
        'jaipur': {lat: 26.8467, lon: 75.7873},
        'gorakhpur': {lat: 26.7606, lon: 83.3732},
        'lucknow': {lat: 26.8467, lon: 75.7873},
        'london': {lat: 51.5074, lon: -0.1278},
        'new york': {lat: 40.7128, lon: -74.0060},
        'tokyo': {lat: 35.6762, lon: 139.6503},
        'paris': {lat: 48.8566, lon: 2.3522},
        'sydney': {lat: -33.8688, lon: 151.2093}
      };

      const normalizedCity = cityName.toLowerCase();
      return cityCoords[normalizedCity] || null;
    }
  }

  async getWeatherByCoords(lat, lon, locationName){
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);

      if(!response){
        throw new Error('Weather API request failed');
      }

      const data = await response.json();
      this.displayWeather(data, locationName);
      this.hideError();
    } catch (error) {
      console.error('Error fetching weather:', error);

      // Fallback to mock data if API fails 

      const mockData = this.getMockWeatherData(locationName);
      this.displayWeather(mockData, locationName);
    }
  }

  getMockWeatherData(locationName){
    // Fallback mock data structure matching Open-Meteo API 

    return{
      current_weather: {
        temperature: 25 + Math.random() * 10,
        windspeed: 5 + Math.random() * 15,
        weathercode: [0, 1, 2, 3, 61, 63][Math.floor(Math.random() * 6)]
      },

      hourly: {
        relative_humidity_2m: [60 + Math.random() * 20],
        temperature_2m: [25 + Math.random() * 10],
        visibility: [8000 + Math.random() * 5000]
      },

      daily: {
        weather_code: [0, 1, 2, 3, 61].map(() => Math.floor(Math.random() * 4)),
        temperature_2m_max: [20, 22, 25, 28, 30].map(t => t + Math.random() * 5),
        temperature_2m_min: [15, 17, 20, 22, 25].map(t => t + Math.random() * 3)
      }
    };
  }

  getWeatherIcon(weatherCode){
    const iconMap = {
      0: '☀️',  // Clear Sky
      1: '🌤️',  // Mainly Clear
      2: '⛅',  // Partly Cloudy
      3: '☁️',  // Overcast
      45: '🌫️',  // Fog
      48: '🌫️',  // Depositing Rime Fog
      51: '🌦️',  // Light Drizzle
      53: '🌦️',  // Moderate Drizzle
      55: '🌧️',  // Dense Drizzle
      61: '🌧️',  // Slight Rain
      63: '🌧️',  // Moderate Rain
      65: '⛈️',  // Heavy Rain
      71: '❄️',  // Slight Snow
      73: '❄️',  // Moderate Snow
      75: '🌨️',  // Heavy Snow
      95: '⛈️'   // Thunderstrom
    };

    return iconMap[weatherCode] || '🌤️';
  }

  displayWeather(data, locationName){
    const t = this.translations[this.currentLanguage];
    const current = data.current_weather;

    // Update current weather 

    const locationNameEl = document.getElementById('locationName');
    const temperatureEl = document.getElementById('temperature');
    const feelsLikeEl = document.getElementById('feelsLike');
    const weatherIconEl = document.getElementById('weatherIcon');
    const weatherDescEl = document.getElementById('weatherDescription');

    if(locationNameEl){
      locationNameEl.textContent = locationName;
    }

    if(temperatureEl){
      temperatureEl.textContent = `${Math.round(current.temperature)}°`;
    }

    if(feelsLikeEl){
      feelsLikeEl.textContent = `${t.feelsLike} ${Math.round(current.temperature + 2)}°`;
    }

    if(weatherIconEl){
      weatherIconEl.textContent = this.getWeatherIcon(current.weathercode);
      weatherIconEl.className = 'text-8xl mb-2 float-animation';
    }

    const weatherCondition = t.weatherConditions[current.weathercode] || t.weatherConditions[0];
    if(weatherDescEl){
      weatherDescEl.textContent = weatherCondition;
    }

    // Update weather details 

    const windSpeedEl = document.getElementById('windSpeed');
    const humidityEl = document.getElementById('humidity');
    const visibilityEl = document.getElementById('visibility');
    const pressureEl = document.getElementById('pressure');

    if(windSpeedEl){
      windSpeedEl.textContent = `${Math.round(current.windspeed)} km/h`;
    }

    if(humidityEl){
      humidityEl.textContent = `${Math.round(data.hourly?.relative_humidity_2m?.[0] || 65)}%`;
    }

    // Convert visibility from meters to kilometers

    const visibilityMeters = data.hourly?.visibility?.[0] || 1000;
    const visibilityKm = Math.round(visibilityMeters / 1000);

    if(visibilityEl){
      visibilityEl.textContent = `${visibilityKm} km`;
    }

    if(pressureEl){
      pressureEl.textContent = `${1000 + Math.floor(Math.random() * 50)} hPa`;
    }

    // Update forecast 

    this.displayForecast(data.daily, t);

    // Update background based on weather 

    this.updateBackground(current.weathercode);

    // Update labels 

    this.updateWeatherDetailsLabels(t);

    // Show weather container with animation 

    const weatherContainer = document.getElementById('weatherContainer');
    if(weatherContainer){
      weatherContainer.classList.remove('hidden');
      weatherContainer.style.opacity = '0';
      weatherContainer.style.transform = 'translateY(20px)';

      setTimeout(() =>{
        weatherContainer.style.transition = 'all 0.6s ease-out';
        weatherContainer.style.opacity = '1';
        weatherContainer.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  updateWeatherDetailsLabels(t){
    // Update the labels in the weather details grid 

    const detailsGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
    if(detailsGrid){
      const labels = [t.windSpeed, t.humidity, t.visibility, t.pressure];
      const labelElements = detailsGrid.querySelectorAll('.text-white\\/80.text-sm');

      labelElements.forEach((element, index)=>{
        if(labels[index]){
          element.textContent = labels[index];
        }
      });
    }

    // Update forecast title 

    const forecastTitle = document.querySelector('h3');
    if(forecastTitle){
      forecastTitle.textContent = t.forecast5Day;
    }
  }

  displayForecast(dailyData, t){
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    const today = new Date();

    const weekDays = this.currentLanguage == 'hi' ? ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for(let i = 0; i < 5; i++){
      const dateObj = new Date();
      dateObj.setDate(today.getDate() + i);

      let label = '';
      if(i === 0){
        label = this.currentLanguage === 'hi' ? 'आज' : 'Today';
      } else if(i === 1){
        label = this.currentLanguage === 'hi' ? 'कल' : 'Tommorow'
      } else{
        label = weekDays[dateObj.getDay()];
      }

      const dateLabel = dateObj.toLocaleDateString(
        this.currentLanguage === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' }
      );

      const weatherCode = dailyData?.weather_code?.[i] || 0;
      const maxTemp = dailyData?.temperature_2m_max?.[i] ?? 25;
      const minTemp = dailyData?.temperature_2m_min?.[i] ?? 18;

      const card = document.createElement('div');
      card.className = 'bg-white/10 rounded-2xl p-4 text-center interactive-card transform transition-all duration-300 hover:scale-105';

      card.innerHTML = `
        <div class="text-white font-semibold mb-1">${label}</div>
        <div class="text-white font-semibold mb-2">${dateLabel}</div>

        <div class='text-4xl mb-2 float-animation'>${this.getWeatherIcon(weatherCode)}</div>

        <div class="text-white font-bold text-lg">${Math.round(maxTemp)}°</div>
        <div class="text-white/60 text-sm">${Math.round(minTemp)}°</div>

        <div class="text-white/70 text-xs mt-2">${t.weatherConditions[weatherCode] || t.weatherConditions[0]}</div>
      `

      forecastContainer.appendChild(card);

      // Animate in 

      setTimeout(() =>{
        card.style.transition ='all 0.5s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + (i * 100));
    }
  }

  updateBackground(weatherCode){
    const body = document.body;

    if(weatherCode <= 1){
      // Clear/Mainly clear 

      body.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3, #fdcb6e)';
    } else if(weatherCode <= 3){
      // Cloudy

      body.style.background = 'linear-gradient(135deg, #636e72, #2d3436, #74b9ff)';
    } else if(weatherCode >= 51 && weatherCode <= 65){
      // Rain 

      body.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3, #00b894)';
    } else if(weatherCode >= 71 && weatherCode <= 75){
      // Snow 

      body.style.background = 'linear-gradient(135deg, #ddd6fe, #8b5cf6, #e17055)';
    } else if(weatherCode >= 95){
      // ThunderStrom 

      body.style.background = 'linear-gradient(135deg, #2d3436, #636e72, #6c5ce7)';
    } else {
      // Default 

      body.style.background = 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)';
    }
  }

  showSearchLoading(){
    const t = this.translations[this.currentLanguage];
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');

    if(searchBtn){
      searchBtn.innerHTML = t.searching;
      searchBtn.disabled = true;
    }
    if(locationBtn){
      locationBtn.innerHTML = t.gettingLocation;
      locationBtn.disabled = true;
    }
  }

  hideSearchLoading(){
    const t = this.translations[this.currentLanguage];
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');

    if(searchBtn){
      searchBtn.innerHTML = t.searchWeather;
      searchBtn.disabled = false;
    }
    if(locationBtn){
      locationBtn.innerHTML = t.myLocation;
      locationBtn.disabled = false;
    }
  }

  showError(message){
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    if(errorDiv && errorText){
      errorText.textContent = message;
      errorDiv.classList.remove('hidden');
      errorDiv.style.transform = 'translateY(-10px)';
      errorDiv.style.opacity = '0';

      setTimeout(()=>{
        errorDiv.style.transition = 'all 0.3s ease-out';
        errorDiv.style.transform = 'translateY(0)';
        errorDiv.style.opacity = '1';
      }, 100);

      // Hide error after 5 seconds

      setTimeout(()=>{
        this.hideError();
      }, 5000);
    }
  }

  hideError(){
    const errorDiv = document.getElementById('errorMessage');
    if(errorDiv){
      errorDiv.style.transition = 'all 0.3s ease-out';
      errorDiv.style.transform = 'translateY(-10px)';
      errorDiv.style.opacity = '0';

      setTimeout(() =>{
        errorDiv.classList.add('hidden');
      }, 300);
    }
  }
}

// Initialize the weather app when DOM is loaded 

document.addEventListener('DOMContentLoaded', ()=>{
  new WeatherApp();
});

// Add interactive features and animations

document.addEventListener('DOMContentLoaded', ()=>{
  // Add click effect to interactive elements 

  const addRippleEffect = () =>{
    const interactiveElements = document.querySelectorAll('button, .interactive-card');

    interactiveElements.forEach(element => {
      element.addEventListener('click', function(e){
        // Create ripple effect 

        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(()=>{
          ripple.remove();
        }, 600);
      });
    });
  };

  // Initial setup 

  setTimeout(addRippleEffect, 500);

  // Add keyboard navigation

  document.addEventListener('keydown', (e) =>{
    if(e.key === 'Escape'){
      const errorMessage = document.getElementById('errorMessage');
      const settingsDropDown = document.getElementById('settingsDropDown');

      if(!errorMessage.classList.contains('hidden')){
        errorMessage.classList.add('hidden');
      }

      if(!settingsDropDown.classList.contains('hidden')){
        settingsDropDown.classList.add('hidden');
      }
    }
  });

  // Add weather icon rotation for sunny weather

  setInterval(()=>{
    const weatherIcon = document.getElementById('weatherIcon');
    if(weatherIcon && weatherIcon.textContent === '☀️'){
      weatherIcon.style.transform = 'rotate(360deg)';
      weatherIcon.style.transition = 'transform 2s ease-in-out';

      setTimeout(()=>{
        weatherIcon.style.transform = 'rotate(0deg)';
      }, 2000);
    }
  }, 5000);
});

// Add CSS for ripple effect and enhanced animations

const style = document.createElement('style');
style.textContent = `
  .ripple{
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    z-index: 10;
  }

  @keyframes ripple-animation{
    to{
      transform: scale(4);
      opacity: 0;
    }
  }

  button, .interactive-card{
    position: relative;
    overflow: hidden;
  }

  .float-animation{
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float{
    0%, 100%{
      transform: translateY(0px);
    }

    50%{
      transform: translateY(-10px);
    }
  }

  button:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }

  .interactive-card:hover{
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  #settingsDropDown{
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown{
    from{
      opacity: 0;
      transform: translateY(-10px);
    }

    to{
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style);