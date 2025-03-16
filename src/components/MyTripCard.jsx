import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.webp";
import { GetPlaceDetails, PHOTO_REF_URL } from '../service/GlobalApi';
import { Link } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { toast } from 'sonner';
import { AiOutlineDelete } from "react-icons/ai";

const MyTripCard = ({ trip, onDelete }) => {
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

  const handleDelete = async () => {
    if (!trip?.id) return;

    try {
      await deleteDoc(doc(db, "Trips", trip.id));
      toast.success("Trip deleted successfully!");
      onDelete(trip.id); // Remove from UI
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip.");
    }
  };

  if (!trip?.userSelection?.location?.label) {
    return <div className="text-center text-gray-500">Loading trip details...</div>;
  }

  return (
    <div className="relative w-72 h-64 bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex flex-col"> 
      {/* Delete Button */}
      <button 
        onClick={handleDelete} 
        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition duration-300 cursor-pointer"
      >
        <AiOutlineDelete className="h-5 w-5" />
      </button>

      {/* Image with fixed height */}
      <Link to={`/trip/${trip.id}`}>
        <div className="w-full h-40">
          <img 
            src={photoUrl || placeholder} 
            alt="Trip location" 
            className="w-full h-full object-cover" 
            onError={(e) => e.target.src = placeholder} 
          />
        </div>
      </Link>

      {/* Text Content */}
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-gray-800 truncate">{trip?.userSelection?.location?.label}</h2>
        <p className="text-sm text-gray-500">
          {trip?.userSelection?.days} days trip with {trip?.userSelection?.budget} budget
        </p>
      </div>
    </div>
  );
};

export default MyTripCard;
