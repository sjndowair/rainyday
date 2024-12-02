
import {useState} from "react";
import {useThemeStore} from "../../store";

interface IChartButtonProps {
    value?: string;
    type?: string;
    key?: string | number;
    isActiveChart?: string | [];
    onClickActiveChart?: (e: string) => void;
    setIsActiveChart?: any;
}

const CHART_DATA = ["candlestick", "line", "donut"]

const ChartButton = ({value ,type ,setIsActiveChart, isActiveChart}: IChartButtonProps) =>  {

    const {isDarkMode} = useThemeStore();

    return (
        <>
                <button onClick={() => setIsActiveChart(type)}

                        className={`px-3 py-1 rounded ${isDarkMode ?  'bg-blue-600' : "bg-purple-500"} bg-opacity-70 hover:bg-opacity-90`}
                >{type?.charAt(0).toUpperCase() + type!.slice(1)}</button>
        </>
    )

}

export default ChartButton