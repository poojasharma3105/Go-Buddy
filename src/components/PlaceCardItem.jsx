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
        const data = { textQuery: activity.placeName };

        await GetPlaceDetails(data)
            .then((res) => {
                if (res.data.places && res.data.places.length > 0) {
                    const photoName = res.data.places[0]?.photos?.[3]?.name;
                    if (photoName) {
                        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                        setPhotoUrl(PhotoUrl);
                    }
                }
            })
            .catch((err) => console.error('API Error:', err));
    };

    return (
        <div className="border rounded-xl p-3 mt-2 flex flex-col sm:flex-row h-auto sm:h-[180px] bg-white shadow-md">
            <img 
                src={photoUrl || placeholder} 
                alt={activity.placeName} 
                className="w-full sm:w-[120px] h-[153px] rounded-xl object-cover"
                onError={(e) => e.target.src = placeholder}
            />
            <div className="flex flex-col justify-between p-2 w-full">
                <h3 className="font-bold text-md text-gray-900">{activity.placeName}</h3>
                <p className="text-xs text-gray-500 mt-1">{activity.placeDetails}</p>
                <h2 className="text-xs mt-2 font-semibold text-gray-700">
                    Ticket Price: {activity.ticketPricing}
                </h2>
                <Link 
                    to={'https://www.google.com/maps/search/?api=1&query='+activity.placeName} 
                    target="_blank"
                    className="self-start mt-2"
                >
                    <button className="flex items-center gap-1 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-xs">
                        <FaMapLocationDot />
                        View on Map
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PlaceCardItem;
