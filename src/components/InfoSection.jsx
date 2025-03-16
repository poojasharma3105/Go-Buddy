import React, { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.webp';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '../service/GlobalApi';

const InfoSection = ({ trip }) => {
 
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location?.label) return;

    const data = { textQuery: trip.userSelection.location.label };

    try {
      const res = await GetPlaceDetails(data); // Ensure this function is properly defined

      if (res?.data?.places?.length) {
        const photoName =
          res.data.places[0]?.photos?.[3]?.name || res.data.places[0]?.photos?.[0]?.name;
        if (photoName) {
          setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photoName));
        } else {
          console.warn('No photo found');
        }
      } else {
        console.warn('No places found for the query');
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  if (!trip?.userSelection?.location?.label) {
    return <div>Loading trip details...</div>;
  }

  return (
    <div className="p-4">
      <img 
        src={photoUrl || placeholder} 
        alt="Trip destination" 
        className='h-[400px] w-full object-fill rounded-xl'
        onError={(e) => e.target.src = placeholder}
      />
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between mt-5'>
        <div className='flex flex-col gap-4 w-full md:w-2/3'>
          <h2 className='text-2xl font-bold'>
            {trip?.userSelection?.location?.label || 'Unknown Destination'}
          </h2>
          <div className='flex flex-wrap gap-3'>
            <h2 className='p-1 px-3 rounded-full bg-gray-200 text-gray-500'>
              📆 {trip?.userSelection?.days || 0} Day
            </h2>
            <h2 className='p-1 px-3 rounded-full bg-gray-200 text-gray-500'>
              💰 {trip?.userSelection?.budget || 'N/A'} Budget
            </h2>
            <h2 className='p-1 px-3 rounded-full bg-gray-200 text-gray-500'>
              ✈️ No. of Travellers: {trip?.userSelection?.travellers || 1}
            </h2>
          </div>
        </div>
        <button 
          className='mt-4 md:mt-0 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition md:w-auto'
        >
          <IoIosSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
