import React from 'react'
import { Link } from 'react-router'

import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
      <Link to='/'> 
      <h1 className={`text-3xl text-gray-600 h-9 font-extrabold `}>HostelHub </h1>
                      </Link> 
      <UserButton />
    </div>
  )
}

export default Navbar
