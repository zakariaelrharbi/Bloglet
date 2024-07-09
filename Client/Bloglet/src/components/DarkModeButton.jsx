import React from 'react'
import { LuMoon } from "react-icons/lu";

const DarkModeButton = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-1">
      <div className="lg:flex lg:items-center">
        <button
          className="relative px-3 py-2.5 rounded-2xl font-semibold text-black duration-300 ease-linear bg-transparent border border-primaryGreen hover:bg-primaryGreen hover:scale-110 hover:text-black"
        >
            <LuMoon />
        </button>
        </div>
        </div>
    </div>
  )
}

export default DarkModeButton
