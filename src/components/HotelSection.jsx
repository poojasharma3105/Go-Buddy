import React from 'react';
import logo from "../assets/logo.webp";
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

const HotelSection = ({ trip }) => {

    return (
        <div>
            
            <h2 className='mt-5 text-xl font-bold'>Hotel Recommendations</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem key={index} {...hotel}/>
                ))}
            </div>
        </div>
    );
};

export default HotelSection;
