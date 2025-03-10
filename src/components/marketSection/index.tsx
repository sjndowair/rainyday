import { useThemeStore } from "../../store/index";

interface MarketSectionProps {
  title: string;
  market: "krw" | "btc" | "usdt" | "eth";
  isOpen: boolean;
  toggleMarket: (market: "krw" | "btc" | "usdt" | "eth") => void;
  marketData: any[];
  filterMarkets: (markets: any[], prefix: string) => any[];
  selectedMarket: string | null;
  handleMarketClick: (market: string) => void;
}

const MarketSection = ({
  title,
  market,
  isOpen,
  toggleMarket,
  marketData,
  filterMarkets,
  selectedMarket,
  handleMarketClick,
}: MarketSectionProps) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="  overflow-y-hidden">
      <button
        onClick={() => toggleMarket(market)}
        className={`w-full rounded-lg p-4 flex justify-between items-center 
          ${
            isDarkMode
              ? isOpen
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 bg-opacity-50 text-white border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] 2z"
                : "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 bg-opacity-50 text-white"
              : isOpen
              ? "bg-gradient-to-br from-purple-200 via-purple-200 to-purple-100 bg-opacity-50 text-white border-2 border-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
              : "bg-gradient-to-br from-purple-200 via-purple-200 to-purple-100 bg-opacity-50 text-white"
          }`}
      >
        <span
          className={`font-bold ${
            isDarkMode ? "text-blue-500" : "text-purple-600"
          }`}
        >
          {title}
        </span>
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${isDarkMode ? "text-blue-500" : "text-purple-600"} `}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          className={`flex-col flex-wrap gap-10 h-[36rem] items-center justify-start overflow-y-auto ${
            isDarkMode ? "text-black" : "text-white"
          } `}
        >
          {filterMarkets(marketData, market.toUpperCase() + "-").map(
            (e: any) => (
              <div
                onClick={() => handleMarketClick(e.market)}
                className={`overflow-y-hidden flex flex-col ${
                  isDarkMode
                    ? "hover:shadow-blue-500"
                    : "hover:shadow-purple-500"
                } ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 bg-opacity-50 text-white"
                    : "bg-gradient-to-br from-purple-200 via-purple-200 to-purple-100 bg-opacity-50 text-white"
                } w-full px-[1.25rem] py-5 my-5  rounded-lg  shadow-md transition-all hover:cursor-pointer ${
                  selectedMarket === e.market
                    ? isDarkMode
                      ? "border-2 border-blue-500 bg-blue-50 text-blue-700 border-gradient-to-r from-black to-blue-900 "
                      : "border-2 border-purple-500 bg-purple-50 text-purple-700 "
                    : ""
                }`}
                key={e.market}
              >
                <p
                  className={`font-bold ${
                    selectedMarket === e.market
                      ? isDarkMode
                        ? "text-blue-600"
                        : "text-purple-600"
                      : ""
                  }`}
                >
                  {e.market}
                </p>
                <p
                  className={`font-bold ${
                    selectedMarket === e.market
                      ? isDarkMode
                        ? "text-blue-600"
                        : "text-purple-600"
                      : ""
                  }`}
                >
                  {e.korean_name}
                </p>
                <p
                  className={`${
                    selectedMarket === e.market
                      ? isDarkMode
                        ? "text-blue-600"
                        : "text-purple-600"
                      : ""
                  }`}
                >
                  {e.english_name}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MarketSection;
