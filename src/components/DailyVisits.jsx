import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const DailyVisits = ({ trip }) => {
    return (
        <div>
            <h2 className='text-xl font-bold p-4'>Places to Visit</h2>
            <div>
                {trip?.tripData?.travelPlan?.itinerary &&
                    Object.entries(trip.tripData.travelPlan.itinerary).map(([day, place], index) => (
                        <div key={index} className='mt-5 p-4'>
                            <h2 className='font-medium text-lg uppercase'>{day}</h2>
                            <p className='italic'>{place?.theme}</p>
                            <p className='text-sm font-medium text-amber-500'>Best time to visit: {place?.bestTimeToVisit}</p>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4'>
                                {place.activities?.map((activity, i) => (
                                    <div key={i} className='ml-0 sm:ml-4'>
                                        <h3 className='text-sm text-amber-500 mb-5'>⏱️ {activity.timeToTravel}</h3>
                                        <PlaceCardItem activity={activity} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DailyVisits;
