import React, { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.webp';
import { Link } from 'react-router-dom';
import { FaMapLocationDot } from 'react-icons/fa6';
import { PHOTO_REF_URL, GetPlaceDetails } from '../service/GlobalApi';

const PlaceCardItem = ({ activity }) => {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        activity && GetPlacePhoto();
    }, [activity]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: activity.placeName,
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
        <div className='border rounded-xl p-2 mt-2 flex flex-col md:flex-row gap-5 h-auto md:h-[300px] items-start'>
            <img 
                src={photoUrl || placeholder} 
                alt={activity.placeName} 
                className='w-full md:w-1/3 h-[200px] md:h-[180px] rounded-xl object-cover' 
                onError={(e) => e.target.src = placeholder}
            />
            <div className='flex flex-col justify-between w-full'>
                <div>
                    <h3 className='font-bold text-lg'>{activity.placeName}</h3>
                    <p className='text-sm text-gray-400'>{activity.placeDetails}</p>
                    <h2 className='text-sm'>Ticket Price: {activity.ticketPricing}</h2>
                    <Link 
                        to={'https://www.google.com/maps/search/?api=1&query=' + activity.placeName} 
                        target='_blank'
                        className='self-start mt-3'
                    >
                        <button className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer mt-2 flex items-center gap-2'>
                            <FaMapLocationDot />
                            View on Map
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlaceCardItem;
