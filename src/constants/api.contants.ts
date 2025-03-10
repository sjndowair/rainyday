export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const API_BASE_URL = process.env.REACT_APP_BASE_API_URL_KEY;
export const BASE_URL = "https://api.openweathermap.org";

export const REQUEST_INIT_OBJECT: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

type TPeriodType = "1D" | "1W" | "1M" | "6M" | "1Y";

export const getUpbitMarkets = async (details = true) => {
  const url = `https://api.upbit.com/v1/market/all?isDetails=${details}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUpbitCandlesUrl = (market: string, period: TPeriodType) => {
  switch (period) {
    case "1D":
      return `https://api.upbit.com/v1/candles/minutes/60?market=${market}&count=24`;
    case "1W":
      return `https://api.upbit.com/v1/candles/days?market=${market}&count=7`;
    case "1M":
      return `https://api.upbit.com/v1/candles/days?market=${market}&count=30`;
    case "6M":
      return `https://api.upbit.com/v1/candles/days?market=${market}&count=180`;
    case "1Y":
      return `https://api.upbit.com/v1/candles/days?market=${market}&count=365`;
    default:
      return `https://api.upbit.com/v1/candles/minutes/60?market=${market}&count=24`;
  }
};
