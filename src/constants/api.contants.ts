export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const API_BASE_URL = process.env.REACT_APP_BASE_API_URL_KEY;
export const BASE_URL = "https://api.openweathermap.org";

// API URL 환경 설정
const CORS_PROXY = "https://api.allorigins.win/get?url="; // 다른 CORS 프록시로 변경

const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? `${CORS_PROXY}${encodeURIComponent("https://api.upbit.com")}`
    : "/api/upbit";

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
      ? `${CORS_PROXY}${encodeURIComponent(
          `https://api.upbit.com/v1/market/all?isDetails=${details}`
        )}`
      : `/api/upbit/v1/market/all?isDetails=${details}`;

  try {
    console.log("Requesting URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    // allorigins는 응답을 contents 필드에 담아서 반환
    const data =
      process.env.NODE_ENV === "production"
        ? JSON.parse(result.contents)
        : result;

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
  const endpoint = (() => {
    switch (period) {
      case "1D":
        return `minutes/60?market=${market}&count=24`;
      case "1W":
        return `days?market=${market}&count=7`;
      case "1M":
        return `days?market=${market}&count=30`;
      case "6M":
        return `days?market=${market}&count=180`;
      case "1Y":
        return `days?market=${market}&count=365`;
      default:
        return `minutes/60?market=${market}&count=24`;
    }
  })();

  const apiUrl = `https://api.upbit.com/v1/candles/${endpoint}`;

  return process.env.NODE_ENV === "production"
    ? `${CORS_PROXY}${encodeURIComponent(apiUrl)}`
    : `/api/upbit/v1/candles/${endpoint}`;
};
