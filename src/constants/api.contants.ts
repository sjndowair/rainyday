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
  const url = `/api/upbit/v1/market/all?isDetails=${details}`;
  try {
    console.log("Requesting URL:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success response:", data);
    return data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [
      { market: "KRW-BTC", korean_name: "비트코인", english_name: "Bitcoin" },
      { market: "KRW-ETH", korean_name: "이더리움", english_name: "Ethereum" },
    ];
  }
};

export const getUpbitCandlesUrl = (market: string, period: TPeriodType) => {
  switch (period) {
    case "1D":
      return `/api/upbit/v1/candles/minutes/60?market=${market}&count=24`;
    case "1W":
      return `/api/upbit/v1/candles/days?market=${market}&count=7`;
    case "1M":
      return `/api/upbit/v1/candles/days?market=${market}&count=30`;
    case "6M":
      return `/api/upbit/v1/candles/days?market=${market}&count=180`;
    case "1Y":
      return `/api/upbit/v1/candles/days?market=${market}&count=365`;
    default:
      return `/api/upbit/v1/candles/minutes/60?market=${market}&count=24`;
  }
};
