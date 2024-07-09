import React from 'react'
import { useSelector } from 'react-redux'

function ThemeProvider({ children }) {
    const theme = useSelector((state) => state.theme.theme);
    return (
        <div className={`${theme} min-h-screen`}>
            <div className='bg-white text-gray-700 dark:text-white dark:bg-black'>
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider
