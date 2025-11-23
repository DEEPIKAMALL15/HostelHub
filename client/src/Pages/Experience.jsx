import React from 'react'
import { assets } from '../assets/assets'

const Experience = () => {
  return (
    <div className='pt-28 md:pt-32 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-700'>
      <section className='max-w-5xl'>
        <p className='bg-[#49B9FF]/15 text-[#0d6efd] px-3 py-1 rounded-full inline-block'>Why Hostels</p>
        <h1 className='font-playfair text-3xl md:text-5xl mt-3 text-gray-900'>Social stays designed for explorers</h1>
        <p className='mt-3 text-gray-600 max-w-3xl'>Meet travelers, join events, and save more with shared rooms, private pods, and community spaces. Hostels make it easy to connect, explore, and keep your trip on budget.</p>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
        <div className='p-6 rounded-xl bg-white border border-gray-200'>
          <img src={assets.guestsIcon} alt='Guests' className='h-7' />
          <h3 className='mt-3 text-xl font-medium text-gray-900'>Community vibe</h3>
          <p className='mt-2 text-sm'>Common rooms, group activities, and city walks help you meet people fast.</p>
        </div>
        <div className='p-6 rounded-xl bg-white border border-gray-200'>
          <img src={assets.freeWifiIcon} alt='WiFi' className='h-7' />
          <h3 className='mt-3 text-xl font-medium text-gray-900'>Smart amenities</h3>
          <p className='mt-2 text-sm'>Lockers, fast Wi‑Fi, shared kitchens, and laundry keep travel easy and affordable.</p>
        </div>
        <div className='p-6 rounded-xl bg-white border border-gray-200'>
          <img src={assets.badgeIcon} alt='Badge' className='h-7' />
          <h3 className='mt-3 text-xl font-medium text-gray-900'>Verified hostels</h3>
          <p className='mt-2 text-sm'>Every hostel is vetted for safety, cleanliness, and consistent guest ratings.</p>
        </div>
      </section>

      <section className='mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
        <div>
          <h2 className='font-playfair text-2xl md:text-3xl text-gray-900'>How booking works</h2>
          <ul className='mt-4 space-y-3 text-sm'>
            <li className='flex gap-3'><span className='text-gray-900 font-medium'>1.</span> Search hostels by city, dates, and group size.</li>
            <li className='flex gap-3'><span className='text-gray-900 font-medium'>2.</span> Compare room types: dorm beds, private rooms, or pods.</li>
            <li className='flex gap-3'><span className='text-gray-900 font-medium'>3.</span> Check amenities, house rules, and events calendar.</li>
            <li className='flex gap-3'><span className='text-gray-900 font-medium'>4.</span> Book instantly and receive your check‑in details.</li>
          </ul>
          <button onClick={()=>window.scrollTo(0,0)} className='mt-6 px-5 py-2.5 rounded bg-black text-white text-sm'>Find hostels</button>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <img src='../../src/assets/H2.jpeg' alt='Hostel common room' className='rounded-xl shadow object-cover w-full h-48' />
          <img src='../../src/assets/H3.jpeg' alt='Dorm beds' className='rounded-xl shadow object-cover w-full h-48' />
          <img src='../../src/assets/H4.jpeg' alt='Private pod' className='rounded-xl shadow object-cover w-full h-48' />
          <img src='../../src/assets/H1.jpeg' alt='Rooftop hangout' className='rounded-xl shadow object-cover w-full h-48' />
        </div>
      </section>

      <section className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='p-5 rounded-xl bg-[#F6F9FC]'>
          <p className='text-3xl font-semibold text-gray-900'>4.8/5</p>
          <p className='text-sm mt-1'>Average hostel rating</p>
        </div>
        <div className='p-5 rounded-xl bg-[#F6F9FC]'>
          <p className='text-3xl font-semibold text-gray-900'>50k+</p>
          <p className='text-sm mt-1'>Beds available worldwide</p>
        </div>
        <div className='p-5 rounded-xl bg-[#F6F9FC]'>
          <p className='text-3xl font-semibold text-gray-900'>120+</p>
          <p className='text-sm mt-1'>Cities with active events</p>
        </div>
      </section>
    </div>
  )
}

export default Experience


