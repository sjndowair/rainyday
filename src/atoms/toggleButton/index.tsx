
import {useEffect, useState} from 'react';
import {Moon, Sun} from "lucide-react";
import {useThemeStore} from "../../store";




const ToggleButton = () => {


    const [onClickToggleTheme, setOnClickToggleTheme ] = useState(false)

    const {isDarkMode, toggleTheme} = useThemeStore();

    useEffect(() => {
        setOnClickToggleTheme(true)
    }, []);


    if(!onClickToggleTheme) return null;

    return (
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="sr-only"
                        checked={isDarkMode}
                        onChange={toggleTheme}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-600' : 'bg-purple-300'
                    }`}></div>
                    <div
                        className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 flex items-center justify-center ${
                            isDarkMode ? 'transform translate-x-full bg-gray-800' : 'bg-purple-100'
                        }`}>
                        {isDarkMode ? (
                            <Moon className="w-4 h-4 text-yellow-300"/>
                        ) : (
                            <Sun className="w-4 h-4 text-purple-600"/>
                        )}
                    </div>
                </div>

            </label>


    )
}

export default ToggleButton