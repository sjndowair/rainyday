import { useState } from "react";
import { ChartAreaIcon } from "lucide-react";
import { useThemeStore } from "../..//store/index";
import MarketSection from "../marketSection";

interface IChartSearchAreaProps {
  searchTerm: string;

  setSearchTerm: (searchTerm: string) => void;
  openMarkets: {
    krw: boolean;
    btc: boolean;
    usdt: boolean;
    eth: boolean;
  };
  setOpenMarkets: (openMarkets: any) => void;
  marketData: any[];
  selectedMarket: string | null;
  handleMarketClick: (market: string) => void;
  filterMarkets: (markets: any[], prefix: string) => any[];
}

const ChartSearchArea = ({
  searchTerm,
  setSearchTerm,
  openMarkets,
  setOpenMarkets,
  marketData,
  selectedMarket,
  handleMarketClick,
  filterMarkets,
}: IChartSearchAreaProps) => {
  const toggleMarket = (market: "krw" | "btc" | "usdt" | "eth") => {
    setOpenMarkets((prev: any) => ({
      ...prev,
      [market]: !prev[market],
    }));
  };

  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={`flex mt-[1.8rem] flex-col gap-4 p-4 md:w-[20rem] w-full ${
        isDarkMode ? "text-white" : "text-purple-600"
      }`}
    >
      <h2 className="flex items-center justify-center gap-2 text-2xl pb-10 text-center font-bold">
        <ChartAreaIcon size={30} />
        <span>원하는 차트를 찾아보세요!</span>
      </h2>
      <div
        className={`${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 bg-opacity-50 text-white"
            : "bg-gradient-to-br from-purple-200 via-purple-200 to-purple-100 bg-opacity-50 text-white"
        } relative top-0 z-10 p-2`}
      >
        <input
          type="text"
          placeholder="마켓 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${
            isDarkMode
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 bg-opacity-50 text-white border-2 border-blue-900 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              : "bg-gradient-to-br from-purple-200 via-purple-200 to-purple-100 bg-opacity-50 text-white border-2 rounded-md border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          } w-full p-2 `}
        />
      </div>

      {/* KRW 마켓 */}
      <MarketSection
        title="KRW 마켓"
        market="krw"
        isOpen={openMarkets.krw}
        toggleMarket={toggleMarket}
        marketData={marketData}
        filterMarkets={filterMarkets}
        selectedMarket={selectedMarket}
        handleMarketClick={handleMarketClick}
      />

      {/* BTC 마켓 */}
      <MarketSection
        title="BTC 마켓"
        market="btc"
        isOpen={openMarkets.btc}
        toggleMarket={toggleMarket}
        marketData={marketData}
        filterMarkets={filterMarkets}
        selectedMarket={selectedMarket}
        handleMarketClick={handleMarketClick}
      />

      {/* USDT 마켓 */}
      <MarketSection
        title="USDT 마켓"
        market="usdt"
        isOpen={openMarkets.usdt}
        toggleMarket={toggleMarket}
        marketData={marketData}
        filterMarkets={filterMarkets}
        selectedMarket={selectedMarket}
        handleMarketClick={handleMarketClick}
      />
    </div>
  );
};

export default ChartSearchArea;
