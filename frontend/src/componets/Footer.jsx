// eslint-disable-next-line no-unused-vars
import React from 'react'

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="bg-black w-screen px-12 h-[108px] flex items-center text-center justify-center text-white">
        <p className="font-bold">Copyright &copy; {year} Daily Chronicles</p>
    </div>
  )
}

export default Footer