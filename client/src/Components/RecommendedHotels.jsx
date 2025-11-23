import React, { useEffect, useState } from 'react'

import HotelCard from './HotelCard'
import Title from './Title'

import { useAppContext } from '../context/AppContext.jsx'

const RecommendedHotels = () => {
    
    const {rooms,searchedCities,navigate} = useAppContext();
    const [recommended,setRecommended] = useState([]);
    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter(room=> searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);
    }
    useEffect(()=>{
        filterHotels();
    },[rooms,searchedCities]);
  return recommended.length>0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24  py-20 bg-slate-50'>
      
      <Title title='Recommended Hostels' subTitle='Discover our handpicked selection of great hostels around the world for social, budget-friendly stays.' />

      <div className='flex fex-wrap items-center justify-center gap-6 mt-20'>
        {recommended.slice(0,4).map((room,index)=>(
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

export default RecommendedHotels;
