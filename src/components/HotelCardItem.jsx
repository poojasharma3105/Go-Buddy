import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../assets/placeholder.webp';
import { GetPlaceDetails, PHOTO_REF_URL } from '../service/GlobalApi';

const HotelCardItem = (hotel) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName,
        };

        await GetPlaceDetails(data)
            .then((res) => {
                if (res.data.places && res.data.places.length > 0) {
                    const photoName = res.data.places[0]?.photos?.[3]?.name;
                    
                    if (photoName) {
                        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                        setPhotoUrl(PhotoUrl);
                    } else {
                        console.warn('No photo found at index 3');
                    }
                } else {
                    console.warn('No places found for the query');
                }
            })
            .catch((err) => {
                console.error('API Error:', err);
            });
    };

    return (
        <div className="p-4 max-w-sm mx-auto md:max-w-md lg:max-w-lg">
            <Link 
                to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName + "," + hotel?.hotelAddress} 
                target="_blank"
            >
                <div className="hover:scale-105 transition-all">
                    <img
                        src={photoUrl || placeholder}
                        alt={hotel?.hotelName || "Hotel image"}
                        className='rounded-xl h-[180px] w-[300px] object-cover'
                        onError={(e) => e.target.src = placeholder}
                    />
                    <div className='my-2 flex flex-col gap-2 md:gap-3'>
                        <h2 className='font-medium text-lg'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                        <div className='flex flex-wrap justify-between items-center'>
                            <h2 className='text-sm'>💰 {hotel?.price} /night</h2>
                            <h2 className='text-sm'>⭐️ {hotel?.rating}</h2>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HotelCardItem;
