export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const BASE_URL = "http://api.openweathermap.org";

export const REQUEST_INIT_OBJECT: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
