import React from 'react'

const About = () => {
  return (
    <div className='pt-28 md:pt-32 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-700'>
      <section className='max-w-4xl'>
        <p className='bg-[#49B9FF]/15 text-[#0d6efd] px-3 py-1 rounded-full inline-block'>About HostelHub</p>
        <h1 className='font-playfair text-3xl md:text-5xl mt-3 text-gray-900'>Built for backpackers and budget travelers</h1>
        <p className='mt-3 text-gray-600'>HostelHub helps you discover and book verified hostels around the world. We focus on social stays, transparent reviews, and seamless booking so you can spend less time planning and more time exploring.</p>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
        <div className='p-6 rounded-xl bg-white border border-gray-200'>
          <h3 className='text-xl font-medium text-gray-900'>Our mission</h3>
          <p className='mt-2 text-sm'>Make travel accessible and community-driven by connecting travelers with safe, affordable hostels.</p>
        </div>
        <div className='p-6 rounded-xl bg-white border border-gray-200'>
          <h3 className='text-xl font-medium text-gray-900'>What we do</h3>
          <p className='mt-2 text-sm'>Curate quality hostels, simplify bookings, and highlight events and experiences at each destination.</p>
        </div>
        <div className='p-6 rounded-xl bg-white border border-gray-200'>
          <h3 className='text-xl font-medium text-gray-900'>Why it matters</h3>
          <p className='mt-2 text-sm'>Hostels unlock cultural exchange and affordability—key to sustainable, long‑term travel.</p>
        </div>
      </section>

      <section className='mt-14 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='p-6 rounded-xl bg-[#F6F9FC]'>
          <p className='text-3xl font-semibold text-gray-900'>100k+</p>
          <p className='text-sm mt-1'>Nights booked through QuickStay</p>
        </div>
        <div className='p-6 rounded-xl bg-[#F6F9FC]'>
          <p className='text-3xl font-semibold text-gray-900'>2,000+</p>
          <p className='text-sm mt-1'>Verified hostels and properties</p>
        </div>
      </section>

      <section className='mt-14 max-w-4xl'>
        <h2 className='font-playfair text-2xl md:text-3xl text-gray-900'>Travel better with hostels</h2>
        <p className='mt-3 text-sm'>From dorms to private rooms, hostels offer flexible options for every budget. Enjoy community kitchens, city tips from staff, and events that make solo travel feel social.</p>
      </section>
    </div>
  )
}

export default About


