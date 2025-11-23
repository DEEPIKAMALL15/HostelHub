/* import React from 'react'

import HotelCard from './HotelCard'
import Title from './Title'

import { useAppContext } from '../context/AppContext.jsx'

const FeaturedDestination = () => {
    
    const {rooms,navigate} = useAppContext();
  return rooms.length>0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24  py-20 bg-slate-50'>
      
      <Title title='Featured Destination' subTitle='Discovered our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experience.' />

      <div className='flex fex-wrap items-center justify-center gap-6 mt-20'>
        {rooms.slice(0,4).map((room,index)=>(
            <HotelCard key={room._id} room={room} index={index}/>
        ))}
      </div>
      <button  onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}
      className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cusror-pointer'>
        View All Destinations
      </button>

    </div>
  )
}

export default FeaturedDestination
 */

import React from 'react';
import HotelCard from './HotelCard.jsx';
import Title from './Title.jsx';
import { useAppContext } from '../context/AppContext.jsx';

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-4 sm:px-6 md:px-16 lg:px-24 py-16 bg-slate-50'>

      <Title
        title='Featured Destination'
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.'
      />

      <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      <button
        onClick={() => { navigate('/rooms'); scrollTo(0, 0); }}
        className='mt-12 px-5 py-2.5 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-all'
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;
