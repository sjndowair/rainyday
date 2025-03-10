import {
  BASE_URL,
  API_KEY,
  REQUEST_INIT_OBJECT,
} from "../constants/api.contants";
import { IWeatherApiProps } from "../types/weatherList";

export const getWeatherList = async (
  lat: string | number,
  lon: string | number,
  reqInit: RequestInit = REQUEST_INIT_OBJECT
): Promise<IWeatherApiProps> => {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      reqInit
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};

export const getWeatherDetail = async (
  lat: string | number,
  lon: string | number,
  reqInit: RequestInit = REQUEST_INIT_OBJECT
): Promise<IWeatherApiProps> => {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      reqInit
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};

interface IWeatherDataProps {
  iconData: string;
}

export const weatherIcon = ({ iconData }: IWeatherDataProps) => {
  return `http://openweathermap.org/img/wn/${iconData}@2x.png`;
};
