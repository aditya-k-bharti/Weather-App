# ⛅ Weather App
> Real-time weather updates for any location — built with vanilla HTML, CSS/TailwindCSS & JavaScript, powered by the Open-Meteo API.

**Live Demo → [adityakbharti-weather.netlify.app](https://adityakbharti-weather.netlify.app)**

---

## 🌦️ Features

### 🔍 Location Search
Search any city worldwide with live autocomplete suggestions. Results load instantly with smooth animations.

### 📍 Current Location
One-click GPS-based weather detection using the browser's Geolocation API.

### 🕐 Hourly Forecast
Hour-by-hour temperature and weather condition breakdown with dynamic weather icons.

### 📅 7-Day Forecast
Full week forecast with daily high/low temperatures and condition icons.

### 🌿 Air Quality Index (AQI)
Real-time air quality data with color-coded labels — from Good to Hazardous.

### ⭐ Favourite Locations
Save and quickly revisit your favourite cities with one click.

### 🌐 Bilingual Support
Toggle between **English** and **हिंदी** from the settings panel — all UI text updates instantly.

### 🎨 Dynamic Backgrounds
Background gradient changes automatically based on current weather conditions (clear, cloudy, rainy, snowy, stormy).

---

## ✨ Highlights

- ⚡ **Auto-refresh** — weather data updates every 5 minutes when the tab is active
- 📱 **Fully responsive** — works seamlessly on mobile and desktop
- 💨 **Smooth animations** — fade-in, slide-up, bounce-in transitions throughout
- 🌙 **Day/Night icons** — weather icons switch based on local time
- ⌨️ **Keyboard support** — press `Enter` to search, `Escape` to dismiss errors/panels
- 🎯 **Ripple effects** — tactile button feedback on every click
- ♿ **Reduced motion** — respects `prefers-reduced-motion` for accessibility

---

## 🗂️ Project Structure

```
Weather-App/
├── index.html       # Main app — layout, search, weather cards, footer
├── Weather.js       # App logic — API calls, rendering, geolocation, favourites
└── Weather.css      # Custom styles — animations, glass morphism, scrollbar
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure & semantic markup |
| CSS3 | Custom animations, glass morphism effects |
| JavaScript (ES6+) | App logic, API integration, DOM manipulation |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first styling, responsive layout |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | UI icons |
| [Open-Meteo API](https://open-meteo.com/) | Free weather & AQI data (no API key needed) |
| [Nominatim API](https://nominatim.org/) | City geocoding & autocomplete |

---

## 🚀 Run Locally

No build tools needed — pure vanilla project.

```bash
git clone https://github.com/aditya-k-bharti/Weather-App.git
cd Weather-App
```

Then open `index.html` in your browser, or use a local server:

```bash
# With VS Code → Live Server extension (recommended)
# OR with Python
python -m http.server 8000
```

---

## 📸 Pages & Sections

| Section | Description |
|---|---|
| Search Bar | City input with live suggestions dropdown |
| Current Weather | Temperature, feels like, weather icon, condition |
| Weather Details | Wind speed, humidity, visibility, pressure, AQI |
| Hourly Forecast | Scrollable hour-by-hour cards |
| 7-Day Forecast | Scrollable daily forecast cards |
| Favourites | Saved locations for quick access |

---

## 🙌 Author

**Aditya Kumar Bharti**

[![GitHub](https://img.shields.io/badge/GitHub-aditya--k--bharti-181717?style=flat&logo=github)](https://github.com/aditya-k-bharti)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-aditya--kumar--bharti-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/aditya-kumar-bharti-dev-6214b6354)

---

## 📄 License

MIT License — feel free to fork, modify, and use.
