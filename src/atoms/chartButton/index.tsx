
import {useState} from "react";
import {useThemeStore} from "../../store";

interface IChartButtonProps {
    value?: string;
    isActiveChart?: string | [];
    onClickActiveChart?: (e: string) => void;
}

const CHART_DATA = ["candlestick", "line", "donut"]

const ChartButton = ({value, isActiveChart, onClickActiveChart}: IChartButtonProps) =>  {

    // console.log(onClickActiveChart)
    const {isDarkMode} = useThemeStore();

    if(!onClickActiveChart) return null;




    return (
        <>
            {CHART_DATA.map((e, i) => (
                <button onClick={() => onClickActiveChart(e)}
                        key={i}
                        className={`px-3 py-1 rounded ${isActiveChart === e ? (isDarkMode ? 'bg-blue-600' : "bg-purple-500") : 'bg-gray-700'}`}
                >{e}</button>

            ))}
        </>
    )

}

export default ChartButton