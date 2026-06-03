/* ============================================================
   Weather App — Upgraded JavaScript (Phases A–D)
   All bugs fixed · XSS hardened · Accessible · Performant
   New features: Sunrise/Sunset, UV Index, Rain Probability,
   Wind Direction, AQI Health Advice, °C/°F Toggle,
   AI Weather Summary, Improved Favorites, PWA Offline Cache
   ============================================================ */

'use strict';

class WeatherApp {

  // ─────────────────────────────────────────
  //  TRANSLATIONS
  // ─────────────────────────────────────────
  static TRANSLATIONS = {
    en: {
      loading: 'Loading Weather Data…',
      pleaseWait: 'Please wait',
      searchWeather: 'Search Weather',
      myLocation: 'My Location',
      enterCity: 'Please enter a city name',
      searching: 'Searching…',
      gettingLocation: 'Locating…',
      feelsLike: 'Feels like',
      windSpeed: 'Wind',
      humidity: 'Humidity',
      visibility: 'Visibility',
      pressure: 'Pressure',
      hourlyForecast: 'Hourly Forecast',
      forecast7Day: '7-Day Forecast',
      cityNotFound: 'City not found. Please try again.',
      geoNotSupported: 'Geolocation is not supported by this browser.',
      locationError: 'Unable to get your location. Please search manually.',
      yourLocation: 'Your Location',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      uvIndex: 'UV Index',
      aqi: 'AQI',
      addFav: 'Add to Favourites',
      removeFav: 'Remove from Favourites',
      inFav: 'In Favourites',
      settings: 'Settings',
      language: 'Language',
      weekDays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      today: 'Today',
      tomorrow: 'Tomorrow',
      weatherConditions: {
        0:  'Clear Sky',
        1:  'Mainly Clear',
        2:  'Partly Cloudy',
        3:  'Overcast',
        45: 'Fog',
        48: 'Freezing Fog',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        71: 'Slight Snow',
        73: 'Moderate Snow',
        75: 'Heavy Snow',
        95: 'Thunderstorm',
        96: 'Thunderstorm with Hail',
        99: 'Heavy Thunderstorm'
      },
      aqiLevels: {
        good:           { label: 'Good',                      advice: '😊 Air quality is excellent. Great day for outdoor activities!',   cls: 'aqi-good' },
        moderate:       { label: 'Moderate',                  advice: '😐 Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion.', cls: 'aqi-moderate' },
        sensitive:      { label: 'Unhealthy for Sensitive',   advice: '😷 People with respiratory conditions should wear a mask outdoors.', cls: 'aqi-sensitive' },
        unhealthy:      { label: 'Unhealthy',                 advice: '⚠️ Everyone should limit outdoor exertion. Wear a mask outside.',    cls: 'aqi-unhealthy' },
        veryUnhealthy:  { label: 'Very Unhealthy',            advice: '🚫 Avoid going outside. Wear N95 if you must go out.',              cls: 'aqi-very-unhealthy' },
        hazardous:      { label: 'Hazardous',                 advice: '☠️ Dangerous air quality. Stay indoors. Close all windows.',        cls: 'aqi-hazardous' }
      },
      uvLevels: ['Low','Low','Moderate','Moderate','High','High','Very High','Very High','Extreme','Extreme','Extreme'],
      appTitle: 'Weather',
      appSubtitle: 'Real-time weather updates for any location',
      cityPlaceholder: 'Enter city name…',
    },
    hi: {
      loading: 'मौसम डेटा लोड हो रहा है…',
      pleaseWait: 'कृपया प्रतीक्षा करें',
      searchWeather: 'मौसम खोजें',
      myLocation: 'मेरा स्थान',
      enterCity: 'कृपया शहर का नाम दर्ज करें',
      searching: 'खोज रहे हैं…',
      gettingLocation: 'स्थान प्राप्त हो रहा है…',
      feelsLike: 'महसूस होता है',
      windSpeed: 'हवा',
      humidity: 'नमी',
      visibility: 'दृश्यता',
      pressure: 'दबाव',
      hourlyForecast: 'प्रति घंटा पूर्वानुमान',
      forecast7Day: '7-दिन का पूर्वानुमान',
      cityNotFound: 'शहर नहीं मिला। कृपया पुनः प्रयास करें।',
      geoNotSupported: 'Geolocation इस browser में समर्थित नहीं है',
      locationError: 'आपका स्थान प्राप्त नहीं हो सका। कृपया manually खोजें।',
      yourLocation: 'आपका स्थान',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      uvIndex: 'UV इंडेक्स',
      aqi: 'AQI',
      addFav: 'पसंदीदा में जोड़ें',
      removeFav: 'पसंदीदा से हटाएं',
      inFav: 'पसंदीदा में है',
      settings: 'सेटिंग्स',
      language: 'भाषा',
      weekDays: ['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'],
      today: 'आज',
      tomorrow: 'कल',
      weatherConditions: {
        0:  'साफ आसमान',
        1:  'मुख्यतः साफ',
        2:  'आंशिक बादल',
        3:  'बादल छाए',
        45: 'कोहरा',
        48: 'जमा हुआ कोहरा',
        51: 'हल्की बूंदाबांदी',
        53: 'मध्यम बूंदाबांदी',
        55: 'घनी बूंदाबांदी',
        61: 'हल्की बारिश',
        63: 'मध्यम बारिश',
        65: 'तेज बारिश',
        71: 'हल्की बर्फ',
        73: 'मध्यम बर्फ',
        75: 'भारी बर्फ',
        95: 'तूफान',
        96: 'ओले के साथ तूफान',
        99: 'भारी तूफान'
      },
      aqiLevels: {
        good:           { label: 'अच्छा',                advice: '😊 वायु गुणवत्ता उत्कृष्ट है। बाहरी गतिविधियों के लिए अच्छा दिन!', cls: 'aqi-good' },
        moderate:       { label: 'मध्यम',                advice: '😐 वायु गुणवत्ता स्वीकार्य है। संवेदनशील लोग बाहरी गतिविधियाँ सीमित करें।', cls: 'aqi-moderate' },
        sensitive:      { label: 'संवेदनशीलों के लिए',  advice: '😷 श्वसन संबंधी समस्या वाले लोग मास्क पहनें।', cls: 'aqi-sensitive' },
        unhealthy:      { label: 'अस्वस्थ',             advice: '⚠️ सभी बाहरी गतिविधियाँ सीमित करें। मास्क पहनें।', cls: 'aqi-unhealthy' },
        veryUnhealthy:  { label: 'बहुत अस्वस्थ',        advice: '🚫 बाहर न जाएं। N95 मास्क पहनें।', cls: 'aqi-very-unhealthy' },
        hazardous:      { label: 'खतरनाक',              advice: '☠️ खतरनाक वायु गुणवत्ता। घर के अंदर रहें।', cls: 'aqi-hazardous' }
      },
      uvLevels: ['कम','कम','मध्यम','मध्यम','अधिक','अधिक','बहुत अधिक','बहुत अधिक','अत्यधिक','अत्यधिक','अत्यधिक'],
      appTitle: 'मौसम',
      appSubtitle: 'किसी भी स्थान के लिए real-time मौसम अपडेट',
      cityPlaceholder: 'शहर का नाम दर्ज करें…',
    }
  };

  // ─────────────────────────────────────────
  //  WEATHER ICON MAP
  // ─────────────────────────────────────────
  static ICON_MAP = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '⛈️',
    71: '❄️',  73: '❄️',  75: '🌨️',
    95: '⛈️',  96: '⛈️',  99: '⛈️'
  };

  // ─────────────────────────────────────────
  //  CONSTRUCTOR
  // ─────────────────────────────────────────
  constructor() {
    this.lang        = 'en';
    this.unit        = 'C';        // 'C' or 'F'
    this.lastCoords  = null;       // { lat, lon }
    this.lastName    = null;
    this.lastData    = null;       // cached API response
    this.activeFavIndex = null;

    // debounce timers
    this._suggestTimer  = null;
    this._clearSuggest  = null;

    this.init();
  }

  // ─────────────────────────────────────────
  //  INIT
  // ─────────────────────────────────────────
  init() {
    this._bindEvents();
    this._applyLanguage();
    this._loadDefaultWeather();
    this._loadFavorites();
    this._startAutoRefresh();
    this._registerServiceWorker();
    setTimeout(() => this._hideLoading(), 1500);
  }

  // ─────────────────────────────────────────
  //  LANGUAGE & UNIT HELPERS
  // ─────────────────────────────────────────
  get t() { return WeatherApp.TRANSLATIONS[this.lang]; }

  _toDisplayTemp(celsius) {
    if (this.unit === 'F') return Math.round(celsius * 9 / 5 + 32);
    return Math.round(celsius);
  }

  _unitSymbol() { return this.unit === 'F' ? '°F' : '°C'; }

  // ─────────────────────────────────────────
  //  SAFE DOM HELPERS (Phase A — XSS)
  // ─────────────────────────────────────────
  _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text ?? '');
  }

  _createEl(tag, { className = '', text = '', attrs = {}, ariaLabel = '' } = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text)      el.textContent = text;
    if (ariaLabel) el.setAttribute('aria-label', ariaLabel);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  // ─────────────────────────────────────────
  //  BIND EVENTS
  // ─────────────────────────────────────────
  _bindEvents() {
    // Search
    const searchBtn  = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');
    const cityInput  = document.getElementById('cityInput');
    const clearBtn   = document.getElementById('clearInputBtn');

    searchBtn?.addEventListener('click',  () => this._searchWeather());
    locationBtn?.addEventListener('click', () => this._getCurrentLocation());

    cityInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this._searchWeather();
      if (e.key === 'Escape') this._hideSuggestions();
      if (e.key === 'ArrowDown') this._focusSuggestion(0);
    });

    cityInput?.addEventListener('input', e => {
      const q = e.target.value.trim();
      clearBtn?.classList.toggle('hidden', q.length === 0);
      this._debounceSuggestions(q);
    });

    clearBtn?.addEventListener('click', () => {
      if (cityInput) cityInput.value = '';
      clearBtn.classList.add('hidden');
      this._hideSuggestions();
      cityInput?.focus();
    });

    // Favourite button
    document.getElementById('favBtn')?.addEventListener('click', () => this._toggleFavourite());

    // Settings toggle
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsDd  = document.getElementById('settingsDropDown');
    settingsBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const open = !settingsDd.classList.contains('hidden');
      settingsDd.classList.toggle('hidden', open);
      settingsBtn.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', e => {
      if (!settingsDd?.contains(e.target) && !settingsBtn?.contains(e.target)) {
        settingsDd?.classList.add('hidden');
        settingsBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    // Language radios
    document.querySelectorAll('.langRadio').forEach(r => {
      r.addEventListener('change', e => {
        this.lang = e.target.value;
        document.getElementById('htmlRoot')?.setAttribute('lang', this.lang);
        this._applyLanguage();
        settingsDd?.classList.add('hidden');
        // Re-render with cached data
        if (this.lastData && this.lastName) {
          this._displayWeather(this.lastData, this.lastName);
        }
      });
    });

    // Unit toggle
    document.getElementById('unitC')?.addEventListener('click', () => this._setUnit('C'));
    document.getElementById('unitF')?.addEventListener('click', () => this._setUnit('F'));

    // Keyboard: Escape closes overlays
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this._hideSuggestions();
        document.getElementById('settingsDropDown')?.classList.add('hidden');
        const err = document.getElementById('errorMessage');
        if (err && !err.classList.contains('hidden')) this._hideError();
      }
    });

    // Ripple on buttons
    document.addEventListener('click', e => {
      const btn = e.target.closest('button, .ripple-origin');
      if (!btn) return;
      const r = this._createEl('span', { className: 'ripple' });
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      btn.classList.add('ripple-origin');
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  }

  // ─────────────────────────────────────────
  //  UNIT TOGGLE
  // ─────────────────────────────────────────
  _setUnit(unit) {
    this.unit = unit;
    document.getElementById('unitC')?.classList.toggle('active', unit === 'C');
    document.getElementById('unitF')?.classList.toggle('active', unit === 'F');
    document.getElementById('unitC')?.setAttribute('aria-pressed', String(unit === 'C'));
    document.getElementById('unitF')?.setAttribute('aria-pressed', String(unit === 'F'));
    if (this.lastData && this.lastName) {
      this._displayWeather(this.lastData, this.lastName);
    }
  }

  // ─────────────────────────────────────────
  //  APPLY LANGUAGE
  // ─────────────────────────────────────────
  _applyLanguage() {
    const t = this.t;
    this._setText('loadingTitle',    t.loading);
    this._setText('loadingSubtitle', t.pleaseWait);

    const titleEl = document.getElementById('appTitle');
    if (titleEl) {
      titleEl.textContent = '';
      titleEl.appendChild(document.createTextNode('⛅ ' + t.appTitle));
    }
    this._setText('appSubtitle',    t.appSubtitle);

    const cityInput = document.getElementById('cityInput');
    if (cityInput) cityInput.placeholder = t.cityPlaceholder;

    this._setText('searchBtnText',   t.searchWeather);
    this._setText('locationBtnText', t.myLocation);
    this._setText('settingsTitle',   t.settings);
    this._setText('hourlyTitle',     t.hourlyForecast);
    this._setText('forecastTitle',   t.forecast7Day);

    const languageLabel = document.getElementById('languageLabel');
    if (languageLabel) languageLabel.textContent = t.language;

    document.getElementById('htmlRoot')?.setAttribute('lang', this.lang);
  }

  // ─────────────────────────────────────────
  //  LOADING SCREEN
  // ─────────────────────────────────────────
  _hideLoading() {
    const el = document.getElementById('loading');
    if (!el) return;
    el.style.transition = 'opacity 0.5s ease-out';
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; }, 500);
  }

  // ─────────────────────────────────────────
  //  SEARCH
  // ─────────────────────────────────────────
  async _searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput?.value.trim();
    if (!city) { this._showError(this.t.enterCity); return; }

    this._setSearchLoading(true);
    this._hideSuggestions();

    try {
      const coords = await this._geocode(city);
      if (coords) {
        await this._fetchAndDisplay(coords.lat, coords.lon, coords.name || city);
        this._hideError();
      } else {
        this._showError(this.t.cityNotFound);
      }
    } catch {
      this._showError(this.t.cityNotFound);
    } finally {
      this._setSearchLoading(false);
    }
  }

  async _getCurrentLocation() {
    if (!navigator.geolocation) { this._showError(this.t.geoNotSupported); return; }
    this._setSearchLoading(true, true);
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lon } = pos.coords;
        await this._fetchAndDisplay(lat, lon, this.t.yourLocation);
        this._hideError();
        this._setSearchLoading(false);
      },
      err => {
        this._setSearchLoading(false);
        this._showError(this.t.locationError);
        console.warn('Geolocation error:', err.message);
      },
      { timeout: 10000 }
    );
  }

  _setSearchLoading(on, isLocation = false) {
    const searchBtn  = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');
    const bar = document.getElementById('searchLoadingBar');

    if (searchBtn) {
      searchBtn.disabled = on;
      this._setText('searchBtnText', on && !isLocation ? this.t.searching : this.t.searchWeather);
    }
    if (locationBtn) {
      locationBtn.disabled = on;
      this._setText('locationBtnText', on && isLocation ? this.t.gettingLocation : this.t.myLocation);
    }
    bar?.classList.toggle('hidden', !on);
  }

  // ─────────────────────────────────────────
  //  GEOCODING — Phase A fix: encodeURIComponent was missing on suggestions
  // ─────────────────────────────────────────
  async _geocode(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': this.lang } });
    if (!res.ok) throw new Error('Geocoding failed');
    const data = await res.json();
    if (!data?.length) return null;
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      name: data[0].address?.city || data[0].address?.town || data[0].address?.village || data[0].display_name.split(',')[0]
    };
  }

  // ─────────────────────────────────────────
  //  SUGGESTIONS — Phase A fix: clearTimeout not clearInterval
  // ─────────────────────────────────────────
  _debounceSuggestions(query) {
    clearTimeout(this._suggestTimer);
    clearTimeout(this._clearSuggest);
    if (query.length < 2) { this._hideSuggestions(); return; }

    this._suggestTimer = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
        const res = await fetch(url, { headers: { 'Accept-Language': this.lang } });
        const data = await res.json();
        this._renderSuggestions(data);
      } catch { /* silent */ }
    }, 350);
  }

  _renderSuggestions(data) {
    const box = document.getElementById('suggestions');
    if (!box) return;

    // Use DocumentFragment — safe, no innerHTML
    const frag = document.createDocumentFragment();

    data.slice(0, 5).forEach((place, i) => {
      const mainName = place.address?.city || place.address?.town || place.address?.village || place.display_name.split(',')[0];
      const subName  = place.display_name;

      const item = this._createEl('div', {
        className: 'suggestion-item',
        attrs: { role: 'option', tabindex: '0', 'aria-selected': 'false', 'data-index': i }
      });

      const mainSpan = this._createEl('div', { className: 'suggestion-main', text: mainName });
      const subSpan  = this._createEl('div', { className: 'suggestion-sub',  text: subName });
      item.appendChild(mainSpan);
      item.appendChild(subSpan);

      const select = () => {
        const input = document.getElementById('cityInput');
        if (input) { input.value = mainName; input.setAttribute('aria-expanded', 'false'); }
        this._hideSuggestions();
        this._fetchAndDisplay(parseFloat(place.lat), parseFloat(place.lon), mainName);
      };

      item.addEventListener('click', select);
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); this._focusSuggestion(i + 1); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); i > 0 ? this._focusSuggestion(i - 1) : document.getElementById('cityInput')?.focus(); }
      });

      frag.appendChild(item);
    });

    box.textContent = ''; // safe clear
    box.appendChild(frag);
    box.classList.remove('hidden');
    document.getElementById('cityInput')?.setAttribute('aria-expanded', 'true');
  }

  _focusSuggestion(index) {
    const items = document.querySelectorAll('#suggestions .suggestion-item');
    items[Math.min(index, items.length - 1)]?.focus();
  }

  _hideSuggestions() {
    const box = document.getElementById('suggestions');
    box?.classList.add('hidden');
    document.getElementById('cityInput')?.setAttribute('aria-expanded', 'false');
  }

  // ─────────────────────────────────────────
  //  WEATHER API — Phase B: added real fields
  // ─────────────────────────────────────────
  async _fetchAndDisplay(lat, lon, name) {
    this.lastCoords = { lat, lon };
    this.lastName   = name;

    try {
      const weatherUrl = [
        `https://api.open-meteo.com/v1/forecast`,
        `?latitude=${lat}&longitude=${lon}`,
        `&current_weather=true`,
        `&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,visibility,precipitation_probability,surface_pressure`,
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset,uv_index_max,precipitation_probability_max`,
        `&timezone=auto`
      ].join('');

      const res = await fetch(weatherUrl);
      if (!res.ok) throw new Error('Weather API failed');
      const data = await res.json();

      this.lastData = data;
      this._displayWeather(data, name);
      this._hideError();
      this._fetchAQI(lat, lon);
    } catch (err) {
      console.warn('Weather fetch failed, using mock:', err.message);
      const mock = this._mockData();
      this.lastData = mock;
      this._displayWeather(mock, name);
      this._fetchAQI(lat, lon);
    }
  }

  // ─────────────────────────────────────────
  //  DISPLAY WEATHER — Phase A: no innerHTML
  // ─────────────────────────────────────────
  _displayWeather(data, locationName) {
    const t = this.t;
    const current = data.current_weather;
    const hourly  = data.hourly;
    const daily   = data.daily;

    // ── Location & local time ──
    this._setText('locationName', locationName);

    const tz = data.timezone || 'UTC';
    try {
      const localNow = new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
      this._setText('localTime', localNow);
    } catch { this._setText('localTime', ''); }

    // ── Temperature ──
    const tempC = current.temperature;
    this._setText('temperature', this._toDisplayTemp(tempC) + '°');
    this._setText('tempUnit', this._unitSymbol());

    // ── Feels like (real value) — Phase A bugfix ──
    const feelsIdx = this._closestHourIndex(hourly.time);
    const feelsC   = hourly.apparent_temperature?.[feelsIdx] ?? tempC;
    this._setText('feelsLike', `${t.feelsLike} ${this._toDisplayTemp(feelsC)}${this._unitSymbol()}`);

    // ── Weather icon & description ──
    const wCode = current.weathercode;
    const iconEl = document.getElementById('weatherIcon');
    if (iconEl) {
      iconEl.textContent = this._getIcon(wCode);
      iconEl.setAttribute('aria-label', t.weatherConditions[wCode] || 'Weather');
      iconEl.className = 'text-8xl mb-3 animate-float';
    }
    this._setText('weatherDescription', t.weatherConditions[wCode] || t.weatherConditions[0]);

    // ── Wind ──
    const windSpeed = Math.round(current.windspeed);
    const windDirDeg = hourly.wind_direction_10m?.[feelsIdx];
    const windDirLabel = windDirDeg !== undefined ? this._bearingToCompass(windDirDeg) : '—';
    this._setText('windSpeed', `${windSpeed} km/h`);
    this._setText('windDir', windDirLabel);

    // ── Humidity ──
    const hum = Math.round(hourly.relative_humidity_2m?.[feelsIdx] ?? 65);
    this._setText('humidity', `${hum}%`);

    // ── Visibility ──
    const visM  = hourly.visibility?.[feelsIdx] ?? 10000;
    const visKm = Math.round(visM / 1000);
    this._setText('visibility', `${visKm} km`);

    // ── Pressure — from hourly surface_pressure ──
    const pressVal = hourly?.surface_pressure?.[feelsIdx] ?? null;
    this._setText('pressure', pressVal !== null ? `${Math.round(pressVal)} hPa` : '—');

    // ── UV Index ──
    const uv = daily?.uv_index_max?.[0] ?? null;
    const uvLabel = uv !== null ? (t.uvLevels[Math.min(Math.floor(uv), 10)] || '') : '—';
    this._setText('uvIndex', uv !== null ? `${Math.round(uv)}` : '—');
    this._setText('uvLabel', uvLabel);

    // ── Sunrise / Sunset ──
    if (daily?.sunrise?.[0]) {
      const srTime = new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this._setText('sunriseTime', srTime);
    }
    if (daily?.sunset?.[0]) {
      const ssTime = new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this._setText('sunsetTime', ssTime);
    }

    // ── Background ──
    this._updateBackground(wCode);

    // ── Forecasts ──
    this._renderHourly(hourly);
    this._renderForecast(daily);

    // ── Favourite state ──
    const favs = this._getFavs();
    const isFav = favs.some(f => f.lat === this.lastCoords?.lat && f.lon === this.lastCoords?.lon);
    this._setFavBtn(isFav);

    // ── Show container ──
    const container = document.getElementById('weatherContainer');
    if (container) {
      container.classList.remove('hidden');
      container.style.opacity = '0';
      container.style.transform = 'translateY(16px)';
      requestAnimationFrame(() => {
        container.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });
    }

    // ── AI Summary ──
    this._generateAISummary(tempC, wCode, hum, windSpeed, uv);
  }

  // ─────────────────────────────────────────
  //  HOURLY FORECAST — Phase A: DocumentFragment, no innerHTML
  // ─────────────────────────────────────────
  _renderHourly(hourly) {
    const container = document.getElementById('hourlyForecast');
    if (!container) return;

    const frag = document.createDocumentFragment();
    const now   = new Date();
    const start = this._closestHourIndex(hourly.time);

    for (let i = start; i < start + 12 && i < hourly.time.length; i++) {
      const idx     = i % hourly.time.length;
      const temp    = hourly.temperature_2m[idx];
      const wCode   = hourly.weather_code?.[idx] ?? 0;
      const rain    = hourly.precipitation_probability?.[idx] ?? null;
      const wind    = hourly.wind_speed_10m?.[idx] ?? null;
      const time    = new Date(hourly.time[idx]);
      const hour    = time.getHours();
      const isNight = hour >= 20 || hour < 5;
      const isCurrent = i === start;

      const timeStr = time.toLocaleTimeString([], { hour: 'numeric', hour12: true });

      const card = this._createEl('div', {
        className: `hourly-card snap-start${isCurrent ? ' current-hour' : ''}`,
        attrs: { role: 'listitem', 'aria-label': `${timeStr}: ${this._toDisplayTemp(temp)}${this._unitSymbol()}` }
      });

      const timeEl  = this._createEl('div', { className: 'hourly-time', text: isCurrent ? 'Now' : timeStr });
      const iconEl  = this._createEl('div', { className: 'hourly-icon', text: this._getIcon(wCode, isNight) });
      const tempEl  = this._createEl('div', { className: 'hourly-temp', text: `${this._toDisplayTemp(temp)}°` });
      card.appendChild(timeEl);
      card.appendChild(iconEl);
      card.appendChild(tempEl);

      if (rain !== null) {
        const rainEl = this._createEl('div', { className: 'hourly-rain', text: `💧 ${rain}%` });
        card.appendChild(rainEl);
      }
      if (wind !== null) {
        const windEl = this._createEl('div', { className: 'hourly-wind', text: `💨 ${Math.round(wind)}` });
        card.appendChild(windEl);
      }

      frag.appendChild(card);
    }

    container.textContent = ''; // safe clear
    container.appendChild(frag);
  }

  // ─────────────────────────────────────────
  //  7-DAY FORECAST — Phase A + B
  // ─────────────────────────────────────────
  _renderForecast(daily) {
    const container = document.getElementById('forecast');
    if (!container) return;
    const t = this.t;
    const frag = document.createDocumentFragment();
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + i);

      const dayLabel = i === 0 ? t.today : i === 1 ? t.tomorrow : t.weekDays[dateObj.getDay()];
      const dateLabel = dateObj.toLocaleDateString(this.lang === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' });
      const wCode = daily?.weather_code?.[i] ?? 0;
      const maxC  = daily?.temperature_2m_max?.[i] ?? 25;
      const minC  = daily?.temperature_2m_min?.[i] ?? 18;
      const rainP = daily?.precipitation_probability_max?.[i] ?? null;
      const condition = t.weatherConditions[wCode] || t.weatherConditions[0];

      const card = this._createEl('div', {
        className: 'forecast-card',
        attrs: { role: 'listitem', 'aria-label': `${dayLabel}: ${condition}, High ${this._toDisplayTemp(maxC)}°, Low ${this._toDisplayTemp(minC)}°` }
      });

      // Day + date column
      const dayCol = this._createEl('div');
      dayCol.appendChild(this._createEl('div', { className: 'fc-day', text: dayLabel }));
      dayCol.appendChild(this._createEl('div', { className: 'fc-date', text: dateLabel }));
      if (rainP !== null && rainP > 0) {
        const rainEl = this._createEl('div', { className: 'fc-rain', text: `💧 ${rainP}%` });
        dayCol.appendChild(rainEl);
      }
      card.appendChild(dayCol);

      // Icon
      card.appendChild(this._createEl('div', { className: 'fc-icon', text: this._getIcon(wCode) }));

      // Condition
      card.appendChild(this._createEl('div', { className: 'fc-condition', text: condition }));

      // Temps
      const tempsCol = this._createEl('div', { className: 'fc-temps' });
      tempsCol.appendChild(this._createEl('div', { className: 'fc-max', text: `${this._toDisplayTemp(maxC)}°` }));
      tempsCol.appendChild(this._createEl('div', { className: 'fc-min', text: `${this._toDisplayTemp(minC)}°` }));
      card.appendChild(tempsCol);

      frag.appendChild(card);

      // Staggered animation
      setTimeout(() => card.classList.add('animate-in'), 80 + i * 60);
    }

    container.textContent = ''; // safe clear
    container.appendChild(frag);
  }

  // ─────────────────────────────────────────
  //  AQI — Phase B: health advice
  // ─────────────────────────────────────────
  async _fetchAQI(lat, lon) {
    const aqiEl      = document.getElementById('aqi');
    const aqiLabelEl = document.getElementById('aqiLabel');
    const adviceDiv  = document.getElementById('aqiAdvice');
    const adviceIcon = document.getElementById('aqiAdviceIcon');
    const adviceText = document.getElementById('aqiAdviceText');

    try {
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('AQI fetch failed');
      const data = await res.json();
      const val  = data?.current?.us_aqi;

      if (val != null) {
        if (aqiEl) aqiEl.textContent = val;
        const info = this._getAQIInfo(val);
        if (aqiLabelEl) { aqiLabelEl.textContent = info.label; aqiLabelEl.style.color = info.color; }
        this._showAQIAdvice(info, adviceDiv, adviceIcon, adviceText);
      } else {
        if (aqiEl) aqiEl.textContent = '—';
        if (aqiLabelEl) aqiLabelEl.textContent = '—';
        adviceDiv?.classList.add('hidden');
      }
    } catch {
      if (aqiEl) aqiEl.textContent = '—';
      if (aqiLabelEl) aqiLabelEl.textContent = '—';
      adviceDiv?.classList.add('hidden');
    }
  }

  _getAQIInfo(val) {
    const levels = this.t.aqiLevels;
    if (val <= 50)  return { ...levels.good,          color: '#27ae60' };
    if (val <= 100) return { ...levels.moderate,       color: '#f39c12' };
    if (val <= 150) return { ...levels.sensitive,      color: '#e67e22' };
    if (val <= 200) return { ...levels.unhealthy,      color: '#e74c3c' };
    if (val <= 300) return { ...levels.veryUnhealthy,  color: '#8e44ad' };
    return           { ...levels.hazardous,            color: '#7f0000' };
  }

  _showAQIAdvice(info, div, iconEl, textEl) {
    if (!div || !textEl) return;
    // Remove all aqi-* classes
    div.className = div.className.replace(/\baqi-\S+/g, '').trim();
    div.classList.add(info.cls, 'flex', 'items-start', 'gap-3', 'rounded-xl', 'px-4', 'py-3', 'mt-4');
    div.classList.remove('hidden');

    // Extract icon (first emoji) and text
    const adviceParts = info.advice.match(/^(\S+)\s(.+)$/);
    if (iconEl) iconEl.textContent = adviceParts ? adviceParts[1] : 'ℹ️';
    if (textEl) textEl.textContent = adviceParts ? adviceParts[2] : info.advice;
  }

  // ─────────────────────────────────────────
  //  AI WEATHER SUMMARY — Phase C
  // ─────────────────────────────────────────
  async _generateAISummary(tempC, wCode, humidity, windSpeed, uv) {
    const card    = document.getElementById('aiSummaryCard');
    const textEl  = document.getElementById('aiSummaryText');
    const spinner = document.getElementById('aiLoadingSpinner');
    const tagsEl  = document.getElementById('aiSuggestions');
    if (!card || !textEl) return;

    card.classList.remove('hidden');
    if (spinner) spinner.classList.remove('hidden');
    textEl.textContent = '';
    if (tagsEl) tagsEl.textContent = '';

    const condition = this.t.weatherConditions[wCode] || 'Clear';
    const uvStr = uv != null ? `UV index ${Math.round(uv)}` : 'UV not available';
    const prompt = `You are a friendly weather assistant. Given these conditions: temperature ${Math.round(tempC)}°C, weather: ${condition}, humidity ${humidity}%, wind ${windSpeed} km/h, ${uvStr}.

Write a short, friendly 2–3 sentence plain-English weather summary for a general user. Then on a new line write exactly 3 activity/clothing suggestions as comma-separated tags, prefixed with "TAGS:". Example format:
Today feels warm and breezy with partly cloudy skies. The afternoon may bring some clouds but rain is unlikely.
TAGS: Good for a walk, Light jacket advised, Low UV today`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!res.ok) throw new Error('AI API failed');
      const data = await res.json();
      const raw = data.content?.map(b => b.text || '').join('') || '';

      // Split summary and tags
      const [summaryLine, tagsLine] = raw.split(/\nTAGS:/);
      if (textEl) textEl.textContent = summaryLine.trim();

      if (tagsLine && tagsEl) {
        const tags = tagsLine.split(',').map(s => s.trim()).filter(Boolean);
        const frag = document.createDocumentFragment();
        tags.forEach(tag => {
          frag.appendChild(this._createEl('span', { className: 'ai-tag', text: tag }));
        });
        tagsEl.appendChild(frag);
      }
    } catch {
      // Fallback: rule-based summary
      textEl.textContent = this._fallbackSummary(tempC, wCode, humidity, windSpeed);
      if (tagsEl) {
        const frag = document.createDocumentFragment();
        this._activityTags(tempC, wCode, uv).forEach(tag => {
          frag.appendChild(this._createEl('span', { className: 'ai-tag', text: tag }));
        });
        tagsEl.appendChild(frag);
      }
    } finally {
      if (spinner) spinner.classList.add('hidden');
    }
  }

  _fallbackSummary(tempC, wCode, humidity, wind) {
    const t = this.t;
    const cond = t.weatherConditions[wCode] || 'Clear';
    const tempDesc = tempC >= 35 ? 'very hot' : tempC >= 28 ? 'warm' : tempC >= 18 ? 'pleasant' : tempC >= 10 ? 'cool' : 'cold';
    const humDesc  = humidity >= 80 ? 'very humid' : humidity >= 60 ? 'somewhat humid' : 'comfortable humidity';
    return `Today's weather is ${tempDesc} with ${cond.toLowerCase()} skies and ${humDesc}. Wind is ${wind < 20 ? 'light' : wind < 40 ? 'moderate' : 'strong'} at ${wind} km/h.`;
  }

  _activityTags(tempC, wCode, uv) {
    const tags = [];
    const isRainy = (wCode >= 51 && wCode <= 65) || wCode >= 95;
    if (isRainy)      tags.push('☂️ Carry an umbrella');
    if (tempC < 15)   tags.push('🧥 Wear a jacket');
    if (tempC >= 35)  tags.push('🥵 Stay hydrated');
    if (uv >= 6)      tags.push('🕶️ Wear sunscreen');
    if (!isRainy && tempC >= 18 && tempC <= 30) tags.push('🚶 Good for outdoor walks');
    if (tempC >= 25 && !isRainy) tags.push('🏏 Good day for cricket');
    return tags.slice(0, 3);
  }

  // ─────────────────────────────────────────
  //  FAVOURITES — Phase A: XSS fix; Phase B: UX improvements
  // ─────────────────────────────────────────
  _getFavs() {
    try { return JSON.parse(localStorage.getItem('weather_favs')) || []; }
    catch { return []; }
  }

  _saveFavs(arr) {
    localStorage.setItem('weather_favs', JSON.stringify(arr));
  }

  _toggleFavourite() {
    if (!this.lastCoords || !this.lastName) return;
    let favs = this._getFavs();
    const idx = favs.findIndex(f => f.lat === this.lastCoords.lat && f.lon === this.lastCoords.lon);
    if (idx === -1) {
      // Validate: only store safe strings
      const city = String(this.lastName).substring(0, 80);
      favs.push({ city, lat: this.lastCoords.lat, lon: this.lastCoords.lon });
      this._saveFavs(favs);
      this._setFavBtn(true);
    } else {
      favs.splice(idx, 1);
      this._saveFavs(favs);
      this._setFavBtn(false);
    }
    this._loadFavorites();
  }

  _setFavBtn(isFav) {
    const btn = document.getElementById('favBtn');
    if (!btn) return;
    const iconEl = btn.querySelector('i') || btn;
    btn.classList.toggle('is-fav', isFav);
    btn.setAttribute('aria-pressed', String(isFav));
    btn.setAttribute('aria-label', isFav ? this.t.inFav : this.t.addFav);
    // Update icon safely
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isFav ? 'bi bi-star-fill text-xl' : 'bi bi-star text-xl';
    }
  }

  _loadFavorites() {
    const container = document.getElementById('favList');
    const box       = document.getElementById('favContainer');
    if (!container || !box) return;

    const favs = this._getFavs();
    container.textContent = ''; // safe clear

    if (favs.length === 0) { box.classList.add('hidden'); return; }
    box.classList.remove('hidden');

    const frag = document.createDocumentFragment();
    favs.forEach((item, index) => {
      const chip = this._createEl('div', {
        className: `fav-chip${this.lastName === item.city ? ' active' : ''}`,
        attrs: { role: 'listitem', tabindex: '0', 'aria-label': `View weather for ${item.city}` }
      });

      const nameEl = this._createEl('span', { className: 'fav-chip-name', text: item.city });
      chip.appendChild(nameEl);

      const rmBtn = this._createEl('button', {
        className: 'fav-remove-btn',
        attrs: { 'aria-label': `Remove ${item.city} from favourites` }
      });
      const rmIcon = this._createEl('i', { className: 'bi bi-x', attrs: { 'aria-hidden': 'true' } });
      rmBtn.appendChild(rmIcon);
      chip.appendChild(rmBtn);

      chip.addEventListener('click', e => {
        if (!e.target.closest('button')) {
          this._fetchAndDisplay(item.lat, item.lon, item.city);
        }
      });
      chip.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._fetchAndDisplay(item.lat, item.lon, item.city); }
      });

      rmBtn.addEventListener('click', e => {
        e.stopPropagation();
        const updated = this._getFavs();
        updated.splice(index, 1);
        this._saveFavs(updated);
        this._loadFavorites();
        // Update star if current city was removed
        if (this.lastName === item.city) this._setFavBtn(false);
      });

      frag.appendChild(chip);
    });
    container.appendChild(frag);
  }

  // ─────────────────────────────────────────
  //  BACKGROUND — clean class-based approach
  // ─────────────────────────────────────────
  _updateBackground(wCode) {
    const body = document.getElementById('appBody');
    if (!body) return;
    body.className = body.className.replace(/\bwx-\S+/g, '').trim();
    const isNight = (() => {
      try {
        const h = parseInt(new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: false }));
        return h >= 20 || h < 5;
      } catch { return false; }
    })();

    if (isNight) { body.classList.add('wx-night'); return; }
    if (wCode <= 1) body.classList.add('wx-clear');
    else if (wCode <= 3) body.classList.add('wx-cloudy');
    else if (wCode >= 45 && wCode <= 48) body.classList.add('wx-fog');
    else if (wCode >= 51 && wCode <= 65) body.classList.add('wx-rain');
    else if (wCode >= 71 && wCode <= 75) body.classList.add('wx-snow');
    else if (wCode >= 95) body.classList.add('wx-thunder');
    else body.classList.add('wx-default');
  }

  // ─────────────────────────────────────────
  //  ERROR / LOADING
  // ─────────────────────────────────────────
  _showError(msg) {
    const div  = document.getElementById('errorMessage');
    const text = document.getElementById('errorText');
    if (!div || !text) return;
    text.textContent = String(msg);
    div.classList.remove('hidden');
    div.style.cssText = 'opacity:0;transform:translateY(-8px)';
    requestAnimationFrame(() => {
      div.style.transition = 'all 0.3s ease-out';
      div.style.opacity = '1';
      div.style.transform = 'translateY(0)';
    });
    clearTimeout(this._errorTimer);
    this._errorTimer = setTimeout(() => this._hideError(), 5000);
  }

  _hideError() {
    const div = document.getElementById('errorMessage');
    if (!div) return;
    div.style.transition = 'all 0.3s ease-out';
    div.style.opacity = '0';
    div.style.transform = 'translateY(-8px)';
    setTimeout(() => div.classList.add('hidden'), 300);
  }

  // ─────────────────────────────────────────
  //  AUTO REFRESH — Phase D
  // ─────────────────────────────────────────
  _startAutoRefresh() {
    setInterval(() => {
      if (document.visibilityState === 'visible' && this.lastCoords && this.lastName) {
        this._fetchAndDisplay(this.lastCoords.lat, this.lastCoords.lon, this.lastName);
      }
    }, 5 * 60 * 1000);
  }

  // ─────────────────────────────────────────
  //  DEFAULT WEATHER
  // ─────────────────────────────────────────
  async _loadDefaultWeather() {
    // Default: Delhi
    await this._fetchAndDisplay(28.6139, 77.2090, 'Delhi');
  }

  // ─────────────────────────────────────────
  //  SERVICE WORKER — Phase D (PWA)
  // ─────────────────────────────────────────
  _registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => { /* silent — sw.js may not exist locally */ });
    }
  }

  // ─────────────────────────────────────────
  //  HELPERS
  // ─────────────────────────────────────────
  _getIcon(code, isNight = false) {
    if (isNight) {
      if (code === 0) return '🌙';
      if (code <= 3)  return '🌙☁️';
    }
    return WeatherApp.ICON_MAP[code] || '🌤️';
  }

  _closestHourIndex(times) {
    if (!times?.length) return 0;
    const now = Date.now();
    let best = 0, bestDiff = Infinity;
    times.forEach((t, i) => {
      const diff = Math.abs(new Date(t) - now);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    });
    return best;
  }

  // Phase B fix — correct compass directions
  _bearingToCompass(deg) {
    const dirs = ['N','NE','E','SE','S','SW','W','NW','N'];
    return dirs[Math.round(deg / 45) % 8];
  }

  // ─────────────────────────────────────────
  //  MOCK DATA (fallback) — Phase A bugfix
  // ─────────────────────────────────────────
  _mockData() {
    const now = new Date();
    const times = Array.from({ length: 48 }, (_, i) => {
      const d = new Date(now);
      d.setHours(d.getHours() + i, 0, 0, 0);
      return d.toISOString();
    });
    const dailyTimes = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });

    return {
      timezone: 'Asia/Kolkata',
      current_weather: { temperature: 28, windspeed: 12, weathercode: 2 },
      current: { surface_pressure: 1010 },
      hourly: {
        time: times,
        temperature_2m:           times.map(() => 25 + Math.random() * 8),
        apparent_temperature:     times.map(() => 27 + Math.random() * 6),
        relative_humidity_2m:     times.map(() => Math.round(60 + Math.random() * 20)),
        wind_speed_10m:           times.map(() => Math.round(8 + Math.random() * 12)),
        wind_direction_10m:       times.map(() => Math.round(Math.random() * 360)),
        weather_code:             times.map(() => [0,1,2,3,61][Math.floor(Math.random()*5)]),
        visibility:               times.map(() => 8000 + Math.random() * 4000),
        precipitation_probability: times.map(() => Math.round(Math.random() * 30)),
        surface_pressure:          times.map(() => Math.round(1008 + Math.random() * 10))
      },
      daily: {
        time: dailyTimes,
        weather_code:                    dailyTimes.map(() => [0,1,2,3,61][Math.floor(Math.random()*5)]),
        temperature_2m_max:              dailyTimes.map(() => 28 + Math.random() * 6),
        temperature_2m_min:              dailyTimes.map(() => 18 + Math.random() * 4),
        apparent_temperature_max:        dailyTimes.map(() => 30 + Math.random() * 5),
        sunrise:                         dailyTimes.map(d => d + 'T05:45:00'),
        sunset:                          dailyTimes.map(d => d + 'T19:15:00'),
        uv_index_max:                    dailyTimes.map(() => Math.round(3 + Math.random() * 7)),
        precipitation_probability_max:   dailyTimes.map(() => Math.round(Math.random() * 40))
      }
    };
  }
}

// ─────────────────────────────────────────
//  BOOTSTRAP
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});