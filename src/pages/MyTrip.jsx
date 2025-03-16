import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import MyTripCard from '../components/MyTripCard';

const MyTrip = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'Trips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    setUserTrips(querySnapshot.docs.map(doc => doc.data())); // Improved mapping
  };

  return (
    <div className='px-10 md:px-32 lg:px-56 xl:px-72 mt-10 mb-10'>
      <h2 className='text-3xl font-bold '>My Trips</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
        {userTrips?.length > 0 ? (
          userTrips.map((trip, index) => <MyTripCard key={index} trip={trip} />)
        ) : (
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTrip;
