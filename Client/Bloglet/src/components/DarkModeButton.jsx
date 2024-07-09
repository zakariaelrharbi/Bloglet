import React from 'react'
import { LuMoon } from "react-icons/lu";

const DarkModeButton = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-1">
      <div className="lg:flex lg:items-center">
        <button
          className="relative px-3 py-2.5 rounded-2xl font-semibold text-black duration-300 ease-linear after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-0 hover:after:scale-100 bg-transparent border border-primaryGreen hover:bg-primaryGreen hover:text-black"
        >
            <LuMoon />
        </button>
        </div>
        </div>
    </div>
  )
}

export default DarkModeButton
