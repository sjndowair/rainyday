export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const API_BASE_URL = process.env.REACT_APP_BASE_API_URL_KEY;
export const BASE_URL = "https://api.openweathermap.org";

// API URL 환경 설정
const CORS_PROXY = "https://api.allorigins.win/raw?url="; // 다른 CORS 프록시 서비스로 변경

const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? `${CORS_PROXY}${encodeURIComponent("https://api.upbit.com")}` // URL 인코딩 추가
    : "/api/upbit"; // 개발 환경

export const REQUEST_INIT_OBJECT: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

type TPeriodType = "1D" | "1W" | "1M" | "6M" | "1Y";

export const getUpbitMarkets = async (details = true) => {
  const url =
    process.env.NODE_ENV === "production"
      ? `${BASE_API_URL}/v1/market/all?isDetails=${details}`
      : `/api/upbit/v1/market/all?isDetails=${details}`;

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
  const baseUrl =
    process.env.NODE_ENV === "production" ? BASE_API_URL : "/api/upbit";

  switch (period) {
    case "1D":
      return `${baseUrl}/v1/candles/minutes/60?market=${market}&count=24`;
    case "1W":
      return `${baseUrl}/v1/candles/days?market=${market}&count=7`;
    case "1M":
      return `${baseUrl}/v1/candles/days?market=${market}&count=30`;
    case "6M":
      return `${baseUrl}/v1/candles/days?market=${market}&count=180`;
    case "1Y":
      return `${baseUrl}/v1/candles/days?market=${market}&count=365`;
    default:
      return `${baseUrl}/v1/candles/minutes/60?market=${market}&count=24`;
  }
};
