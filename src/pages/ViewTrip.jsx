import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { db } from '../service/firebaseConfig';
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import HotelSection from '../components/HotelSection';
import DailyVisits from '../components/DailyVisits';

const ViewTrip = () => {

    const {tripId}=useParams();
    const [trip, setTrip] = useState({});

    useEffect(() => {
        tripId&&GetTripData();
    },[tripId]);

    const GetTripData=async() =>{
        const docRef = doc(db, "Trips", tripId);
        const docSnap= await getDoc(docRef);

        if(docSnap.exists()){
            console.log(docSnap.data());
            setTrip(docSnap.data());
        }else{
            console.log("No such document!");
            toast.error("No trip found!");
        }
    }
  return (
    <div className='p-5 md:px-20 lg:px-44 xl:px-56'>
      {/* Information section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <HotelSection trip={trip}/>

      {/* Daily Plans */}
      <DailyVisits trip={trip} />
      
    </div>
  )
}

export default ViewTrip
