
import { useState } from 'react'
import Layout from "../../layout";
import {
    ResponsiveContainer, XAxis, YAxis, Tooltip,
    LineChart, Line, CartesianGrid, Legend,
    PieChart, Pie, Cell
} from 'recharts'
import { Cloud, Droplet } from 'lucide-react'
import Theme from "../../components/theme";
import {donutData, lineData} from "../../dummy/dummy-data";
import { useThemeStore} from "../../store";
import ChartButton from "../../atoms/chartButton";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Home() {
    const [isActiveChart, setIsActiveChart] = useState<string>('')

    const {isDarkMode} =  useThemeStore()

//     const onClickActiveChart = () => {
//     set}
// }

    return (
        <Layout>
        <Theme>
            <div className={`pt-[5rem]`}  ></div>

                <div id="rain-container" className=" fixed inset-0 pointer-events-none" ></div>
                <div className={`max-w-4xl mx-auto ${isDarkMode ? " bg-gray-800 bg-opacity-50 " : ""} backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-6 `}>
                    <div className="flex items-center justify-between mb-6 ">
                        <h1 className="text-2xl font-bold flex items-center ">
                            <Cloud className="mr-2" />
                            Rainy Day Stocks
                        </h1>

                        <div className="flex space-x-2">
                    <ChartButton isActiveChart={isActiveChart} />
                        </div>
                    </div>

                    <div className="h-[400px]">

                        {isActiveChart === 'line' && (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="date" stroke="white" />
                                    <YAxis stroke="white" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                                        labelStyle={{ color: 'white' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>

                        )}

                        {isActiveChart === 'donut' && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={donutData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {donutData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                                        labelStyle={{ color: 'white' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className={`mt-6 ${isDarkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-purple-900 bg-opacity-30'} rounded-lg p-4 flex items-center justify-between`}>
                        <div className="flex items-center">
                            <Droplet className="h-6 w-6 mr-2 text-blue-300" />
                            <span className="text-lg font-semibold">Market Mood: Rainy with a chance of profits</span>
                        </div>
                        <div className="text-sm">Last updated: {new Date().toLocaleString()}</div>
                    </div>
                </div>
        </Theme>
    </Layout>
)}
