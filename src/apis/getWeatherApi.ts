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
  const res = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    reqInit
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("api context 확인 필요");
  }
  return await res.json();
};
