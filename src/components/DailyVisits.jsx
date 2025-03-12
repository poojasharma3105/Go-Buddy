import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const DailyVisits = ({trip}) => {
  return (
    <div>
      <h2 className='text-xl font-bold'>Places to Visit</h2>
      
      <div>
        {trip?.tripData?.travelPlan?.itinerary &&
          Object.entries(trip.tripData.travelPlan.itinerary).map(([day, place], index) => (
            <div key={index} className='mt-5'>
                <h2 className='font-medium text-lg uppercase'>{day}</h2>
                <p className='italic'>{place?.theme}</p>
                <p className='text-sm font-medium text-amber-500'>Best time to visit: {place?.bestTimeToVisit}</p>
 
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {place.activities?.map((activity, i) => (
                <div key={i} className='ml-4'>
                  <h3 className='text-sm text-amber-500'>🕰️ {activity.timeToTravel}</h3>
                  <PlaceCardItem activity={activity} />
                </div>
              ))}
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default DailyVisits
