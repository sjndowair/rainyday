import { useState } from "react";
import Layout from "../../layout";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import Theme from "../../components/theme";
import ChartButton from "../../atoms/chartButton";
import { useQuery } from "@tanstack/react-query";
import {
  getUpbitMarkets,
  getUpbitCandlesUrl,
} from "../../constants/api.contants";
import ChartSearchArea from "../../components/chartSearchArea";
import ChartTable from "../../components/chartTable";

type TPeriodType = "1D" | "1W" | "1M" | "6M" | "1Y";

export default function Home() {
  const [openMarkets, setOpenMarkets] = useState({
    krw: false,
    btc: false,
    usdt: false,
    eth: false,
  });

  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");
  const [period, setPeriod] = useState<TPeriodType>("1Y");
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [visiblePrices, setVisiblePrices] = useState({
    trade: true, // 종가
    opening: true, // 시가
    high: true, // 고가
    low: true, // 저가
  });

  const {
    data: marketData,
    error: marketError,
    isLoading: isMarketLoading,
  } = useQuery({
    queryKey: ["upbitMarkets"],
    queryFn: () => getUpbitMarkets(),
  });

  // const { isDarkMode } = useThemeStore();

  const { data: candleData, isLoading: isCandleLoading } = useQuery({
    queryKey: ["upbitCandles", selectedMarket, period],
    queryFn: async () => {
      if (!selectedMarket) return null;
      const url = getUpbitCandlesUrl(selectedMarket, period);
      const response = await fetch(url);
      const data = await response.json();

      return data.sort(
        (a: any, b: any) =>
          new Date(a.candle_date_time_utc).getTime() -
          new Date(b.candle_date_time_utc).getTime()
      );
    },
    enabled: !!selectedMarket,
  });

  const handleMarketClick = (market: string) => {
    setSelectedMarket(market);
  };

  const formatDate = (dateString: string, periodType: TPeriodType) => {
    if (periodType === "1D") {
      return dateString.slice(11, 16);
    }
    return dateString.slice(0, 10);
  };

  const filterMarkets = (markets: any[], prefix: string) => {
    if (!markets) return [];
    return markets
      .filter((item) => item.market.startsWith(prefix))
      .filter(
        (item) =>
          item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.korean_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.english_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const togglePriceVisibility = (priceType: keyof typeof visiblePrices) => {
    setVisiblePrices((prev) => ({
      ...prev,
      [priceType]: !prev[priceType],
    }));
  };

  if (isMarketLoading) {
    return <div>Loading...</div>;
  }

  if (marketError) {
    return <div>Error: {marketError.message}</div>;
  }

  return (
    <Layout>
      <Theme>
        <div className="flex  ">
          <ChartSearchArea
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openMarkets={openMarkets}
            setOpenMarkets={setOpenMarkets}
            marketData={marketData}
            selectedMarket={selectedMarket}
            handleMarketClick={handleMarketClick}
            filterMarkets={filterMarkets}
          />

          {selectedMarket && (
            <div className="flex-1  p-4">
              <h2 className="mt-[2rem] text-xl font-bold">{selectedMarket}</h2>
              <div className="flex md:flex-row flex-col w-full gap-4 md:items-center justify-between items-start mb-10 mt-[3rem]">
                <div className="flex gap-4 pr-3">
                  <ChartButton
                    onClick={() => setPeriod("1D")}
                    active={period === "1D"}
                  >
                    1일
                  </ChartButton>
                  <ChartButton
                    onClick={() => setPeriod("1W")}
                    active={period === "1W"}
                  >
                    1주
                  </ChartButton>
                  <ChartButton
                    onClick={() => setPeriod("1M")}
                    active={period === "1M"}
                  >
                    1개월
                  </ChartButton>
                  <ChartButton
                    onClick={() => setPeriod("6M")}
                    active={period === "6M"}
                  >
                    6개월
                  </ChartButton>
                  <ChartButton
                    onClick={() => setPeriod("1Y")}
                    active={period === "1Y"}
                  >
                    1년
                  </ChartButton>
                </div>
                <div className="flex gap-2">
                  <ChartButton
                    onClick={() => setChartType("line")}
                    active={chartType === "line"}
                  >
                    라인
                  </ChartButton>
                  <ChartButton
                    onClick={() => setChartType("bar")}
                    active={chartType === "bar"}
                  >
                    바
                  </ChartButton>
                  <ChartButton
                    onClick={() => setChartType("area")}
                    active={chartType === "area"}
                  >
                    영역
                  </ChartButton>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <ChartButton
                  onClick={() => togglePriceVisibility("trade")}
                  active={visiblePrices.trade}
                >
                  종가
                </ChartButton>
                <ChartButton
                  onClick={() => togglePriceVisibility("opening")}
                  active={visiblePrices.opening}
                >
                  시가
                </ChartButton>
                <ChartButton
                  onClick={() => togglePriceVisibility("high")}
                  active={visiblePrices.high}
                >
                  고가
                </ChartButton>
                <ChartButton
                  onClick={() => togglePriceVisibility("low")}
                  active={visiblePrices.low}
                >
                  저가
                </ChartButton>
              </div>

              {isCandleLoading ? (
                <div>로딩중...</div>
              ) : (
                <>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === "line" ? (
                        <LineChart data={candleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey={
                              period === "1D"
                                ? "candle_date_time_kst"
                                : "candle_date_time_utc"
                            }
                            tickFormatter={(time) => formatDate(time, period)}
                          />
                          <YAxis domain={["auto", "auto"]} />
                          <Tooltip
                            labelFormatter={(label) =>
                              formatDate(label, period)
                            }
                          />
                          <Legend />
                          {visiblePrices.trade && (
                            <Line
                              type="monotone"
                              dataKey="trade_price"
                              stroke="#8884d8"
                              name="종가"
                            />
                          )}
                          {visiblePrices.opening && (
                            <Line
                              type="monotone"
                              dataKey="opening_price"
                              stroke="#82ca9d"
                              name="시가"
                            />
                          )}
                          {visiblePrices.high && (
                            <Line
                              type="monotone"
                              dataKey="high_price"
                              stroke="#ff7300"
                              name="고가"
                            />
                          )}
                          {visiblePrices.low && (
                            <Line
                              type="monotone"
                              dataKey="low_price"
                              stroke="#ff0000"
                              name="저가"
                            />
                          )}
                        </LineChart>
                      ) : chartType === "bar" ? (
                        <BarChart data={candleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey={
                              period === "1D"
                                ? "candle_date_time_kst"
                                : "candle_date_time_utc"
                            }
                            tickFormatter={(time) => formatDate(time, period)}
                          />
                          <YAxis domain={["auto", "auto"]} />
                          <Tooltip
                            labelFormatter={(label) =>
                              formatDate(label, period)
                            }
                          />
                          <Legend />
                          {visiblePrices.trade && (
                            <Bar
                              dataKey="trade_price"
                              fill="#8884d8"
                              name="종가"
                            />
                          )}
                          {visiblePrices.opening && (
                            <Bar
                              dataKey="opening_price"
                              fill="#82ca9d"
                              name="시가"
                            />
                          )}
                          {visiblePrices.high && (
                            <Bar
                              dataKey="high_price"
                              fill="#ff7300"
                              name="고가"
                            />
                          )}
                          {visiblePrices.low && (
                            <Bar
                              dataKey="low_price"
                              fill="#ff0000"
                              name="저가"
                            />
                          )}
                        </BarChart>
                      ) : (
                        <AreaChart data={candleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey={
                              period === "1D"
                                ? "candle_date_time_kst"
                                : "candle_date_time_utc"
                            }
                            tickFormatter={(time) => formatDate(time, period)}
                          />
                          <YAxis domain={["auto", "auto"]} />
                          <Tooltip
                            labelFormatter={(label) =>
                              formatDate(label, period)
                            }
                          />
                          <Legend />
                          {visiblePrices.trade && (
                            <Area
                              type="monotone"
                              dataKey="trade_price"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.3}
                              name="종가"
                            />
                          )}
                          {visiblePrices.opening && (
                            <Area
                              type="monotone"
                              dataKey="opening_price"
                              stroke="#82ca9d"
                              fill="#82ca9d"
                              fillOpacity={0.3}
                              name="시가"
                            />
                          )}
                          {visiblePrices.high && (
                            <Area
                              type="monotone"
                              dataKey="high_price"
                              stroke="#ff7300"
                              fill="#ff7300"
                              fillOpacity={0.3}
                              name="고가"
                            />
                          )}
                          {visiblePrices.low && (
                            <Area
                              type="monotone"
                              dataKey="low_price"
                              stroke="#ff0000"
                              fill="#ff0000"
                              fillOpacity={0.3}
                              name="저가"
                            />
                          )}
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  <ChartTable candleData={candleData} />
                </>
              )}
            </div>
          )}
        </div>
      </Theme>
    </Layout>
  );
}
