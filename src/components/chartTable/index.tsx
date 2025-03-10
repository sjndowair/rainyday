import { useThemeStore } from "../../store";

interface IChartTableProps {
  candleData: any[];
}

const ChartTable = ({ candleData }: IChartTableProps) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={`border mt-6 rounded-lg shadow overflow-hidden ${
        isDarkMode
          ? " text-white border-gray-900"
          : " text-gray-900 border-gray-200"
      }`}
    >
      <table className="min-w-full">
        <thead
          className={
            isDarkMode ? " text-white" : "bg text-gray-900-white text-gray-900"
          }
        >
          <tr className={isDarkMode ? " divide-gray-900" : " text-gray-900"}>
            <th className="px-6 py-3 text-left text-xs font-mediumuppercase tracking-wider">
              구분
            </th>
            <th className="px-6 py-3 text-right text-xs font-mediumuppercase tracking-wider">
              가격
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
              변동률
            </th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            isDarkMode ? "divide-gray-900" : "divide-gray-200"
          } `}
        >
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
              시가
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right ">
              {candleData?.[0]?.opening_price?.toLocaleString()} KRW
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right ">
              -
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
              고가
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right ">
              {candleData?.[0]?.high_price?.toLocaleString()} KRW
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
              {(
                ((candleData?.[0]?.high_price -
                  candleData?.[0]?.opening_price) /
                  candleData?.[0]?.opening_price) *
                100
              ).toFixed(2)}
              %
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
              저가
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right ">
              {candleData?.[0]?.low_price?.toLocaleString()} KRW
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
              {(
                ((candleData?.[0]?.low_price - candleData?.[0]?.opening_price) /
                  candleData?.[0]?.opening_price) *
                100
              ).toFixed(2)}
              %
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
              종가
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right ">
              {candleData?.[0]?.trade_price?.toLocaleString()} KRW
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
              <span
                className={
                  candleData?.[0]?.trade_price > candleData?.[0]?.opening_price
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {(
                  ((candleData?.[0]?.trade_price -
                    candleData?.[0]?.opening_price) /
                    candleData?.[0]?.opening_price) *
                  100
                ).toFixed(2)}
                %
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
