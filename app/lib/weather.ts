// app/lib/weather.ts

// Fetches full weather set: current, forecast, history 24h
export async function getWeather(latitude: number, longitude: number) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,rain,uv_index&current=temperature_2m,relativehumidity_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,rain,uv_index&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    // -------------------------------
    // CURRENT NORMALIZED
    // -------------------------------
    const current = {
      temperature: data.current.temperature_2m ?? 0,
      feelsLike: data.current.temperature_2m - 1.5, // fake feels-like (API doesn't provide)
      windSpeed: data.current.wind_speed_10m ?? 0,
      gusts: data.current.wind_gusts_10m ?? 0,
      windDirection: degToCompass(data.current.wind_direction_10m),
      windDegrees: data.current.wind_direction_10m ?? 0,
      humidity: data.current.relativehumidity_2m ?? 0,
      rainIntensity: data.current.rain ?? 0,
      rainDescription: data.current.rain > 0 ? "Light rain" : "Dry",
      uv: data.current.uv_index ?? 0,
    };

    // -------------------------------
    // HOURLY FORECAST (next 48h)
    // -------------------------------
    const forecast = data.hourly.time.map((time: string, idx: number) => ({
      time,
      temperature: data.hourly.temperature_2m[idx],
      humidity: data.hourly.relativehumidity_2m[idx],
      windSpeed: data.hourly.wind_speed_10m[idx],
      windGust: data.hourly.wind_gusts_10m[idx],
      rain: data.hourly.rain[idx],
      windDir: data.hourly.wind_direction_10m[idx],
      uv: data.hourly.uv_index[idx],
    }));

    // -------------------------------
    // LAST 24 HOURS HISTORY
    // -------------------------------
    const nowIndex = data.hourly.time.findIndex(
      (t: string) => t === data.current.time
    );

    const historyStart = Math.max(0, nowIndex - 24);
    const history24h = forecast.slice(historyStart, nowIndex);

    return {
      current,
      forecast,
      history24h,
    };
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return {
      current: null,
      forecast: null,
      history24h: null,
    };
  }
}

// Convert degrees → compass direction
function degToCompass(deg: number) {
  if (deg === null || deg === undefined) return "N/A";
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}
