import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.webp";
import { GetPlaceDetails, PHOTO_REF_URL } from '../service/GlobalApi';
import { Link } from 'react-router-dom';

const MyTripCard = ({ trip }) => {
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
      const res = await GetPlaceDetails(data);

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
    return <div className="text-center text-gray-500">Loading trip details...</div>;
  }

  return (
    <Link to={`/trip/${trip.id}`}>
    <div className="max-w-sm w-full mx-auto bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300 ease-in-out"> 
      <img 
        src={photoUrl || placeholder} 
        alt="Trip location" 
        className="w-full h-48 object-cover" 
        onError={(e) => e.target.src = placeholder} 
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{trip?.userSelection?.location?.label}</h2>
        <p className="text-sm text-gray-500">
          {trip?.userSelection?.days} days trip with {trip?.userSelection?.budget} budget
        </p>
      </div>
    </div>
    </Link>
  );
};

export default MyTripCard;