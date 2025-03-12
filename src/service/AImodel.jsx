import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with Hotel Name, Hotel address, Price with currency symbol attach with price itself, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a JSON format travel plan for Las Vegas for a couple on a budget, covering 3 days.  It includes hotel options, a suggested itinerary, and information you requested.\n\n```json\n{\n  \"travelPlan\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap/Budget-Friendly\",\n    \"travelers\": \"Couple\",\n    \"currency\": \"USD\",\n\n    \"hotelOptions\": [\n      {\n        \"hotelName\": \"Circus Circus Hotel\",\n        \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n        \"price\": \"$40-$70\",\n        \"hotelImageUrl\": \"https://www.casino.org/news/wp-content/uploads/2023/03/circus-circus-hotel-las-vegas.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1260,\n          \"longitude\": -115.1670\n        },\n        \"rating\": 3.5,\n        \"description\": \"A budget-friendly hotel on the Strip, featuring a circus theme, Adventuredome indoor theme park, and affordable dining options.  Expect basic accommodations.\"\n      },\n      {\n        \"hotelName\": \"Excalibur Hotel & Casino\",\n        \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n        \"price\": \"$50-$80\",\n        \"hotelImageUrl\": \"https://media.gettyimages.com/id/178391346/photo/excalibur-hotel-and-casino-las-vegas-nevada.jpg?s=612x612&w=0&k=20&c=3n-1s_0jH3-w13Yn1z9F_n2x3tW4zN5XF_0iG1w3R5g=\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0984,\n          \"longitude\": -115.1748\n        },\n        \"rating\": 4.0,\n        \"description\": \"A medieval-themed hotel with affordable rooms, a variety of restaurants, and entertainment options.  It's well-located at the south end of the Strip.\"\n      },\n      {\n        \"hotelName\": \"Luxor Hotel & Casino\",\n        \"hotelAddress\": \"3900 S Las Vegas Blvd, Las Vegas, NV 89119\",\n        \"price\": \"$60-$90\",\n        \"hotelImageUrl\": \"https://www.casino.org/news/wp-content/uploads/2024/04/Luxor-Las-Vegas-at-night.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0956,\n          \"longitude\": -115.1759\n        },\n        \"rating\": 4.1,\n        \"description\": \"An Egyptian-themed hotel with unique pyramid-shaped architecture. It offers affordable rooms, attractions, and dining options. Be aware that some rooms are interior facing.\"\n      }\n    ],\n\n    \"itinerary\": {\n      \"day1\": {\n        \"theme\": \"Exploring the South Strip & Free Attractions\",\n        \"bestTimeToVisit\": \"Morning/Afternoon for walking, Evening for shows/lights\",\n        \"activities\": [\n          {\n            \"placeName\": \"Welcome to Las Vegas Sign\",\n            \"placeDetails\": \"Iconic sign, a must-see photo opportunity.  Free to visit.\",\n            \"placeImageUrl\": \"https://images.unsplash.com/photo-1575149014434-35ebc8cf7997?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2VsY29tZSUyMHRvJTIwbGFzJTIwdmVnYXMlMjBzaWdufGVufDB8fDB8fHx8MA%3D%3D\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.0828,\n              \"longitude\": -115.1731\n            },\n            \"ticketPricing\": \"$0\",\n            \"timeToTravel\": \"Varies depending on hotel location (15-30 minutes by bus/taxi from Strip hotels).\"\n          },\n          {\n            \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n            \"placeDetails\": \"Stunning floral displays that change seasonally.  Free admission.\",\n            \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/bellagio-conservatory-floral-display-chinese-new-year-2024-wide.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1127,\n              \"longitude\": -115.1760\n            },\n            \"ticketPricing\": \"$0\",\n            \"timeToTravel\": \"10-15 minutes by bus/taxi from south Strip hotels.  Walking distance from central Strip hotels.\"\n          },\n          {\n            \"placeName\": \"Fountains of Bellagio\",\n            \"placeDetails\": \"Spectacular water show choreographed to music.  Free to watch.\",\n            \"placeImageUrl\": \"https://i.ytimg.com/vi/29s9xY1r4-Y/maxresdefault.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1127,\n              \"longitude\": -115.1760\n            },\n            \"ticketPricing\": \"$0\",\n            \"timeToTravel\": \"Adjacent to the Bellagio Conservatory.\"\n          },\n            {\n            \"placeName\": \"Walk the Strip\",\n            \"placeDetails\": \"People watching, exploring different hotel themes (Luxor, Excalibur, New York-New York).  Free.\",\n            \"placeImageUrl\": \"https://a.cdn-hotels.com/gdcs/production177/d1288/c605d46b-0061-4a72-9f69-5095b9e93f03.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1146,\n              \"longitude\": -115.1728\n            },\n            \"ticketPricing\": \"$0\",\n            \"timeToTravel\": \"Flexible, allow several hours for a leisurely walk.\"\n          }\n        ]\n      },\n      \"day2\": {\n        \"theme\": \"Downtown Las Vegas & Budget Entertainment\",\n        \"bestTimeToVisit\": \"Afternoon/Evening\",\n        \"activities\": [\n          {\n            \"placeName\": \"Fremont Street Experience\",\n            \"placeDetails\": \"Light show on a canopy screen, street performers, and classic casinos. Free to walk around.\",\n            \"placeImageUrl\": \"https://i.ytimg.com/vi/r92B3w8r4p0/maxresdefault.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1703,\n              \"longitude\": -115.1423\n            },\n            \"ticketPricing\": \"$0 (some attractions inside may have fees)\",\n            \"timeToTravel\": \"20-30 minutes by taxi/ride-sharing from the Strip.  The Deuce bus is a cheaper option but takes longer (45-60 minutes).\"\n          },\n          {\n            \"placeName\": \"Downtown Container Park\",\n            \"placeDetails\": \"Unique outdoor shopping and entertainment venue built from shipping containers.  Free to enter.\",\n            \"placeImageUrl\": \"https://downtowncontainerpark.com/wp-content/uploads/2018/07/Downtown-Container-Park-Las-Vegas-Slider-image-4.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1686,\n              \"longitude\": -115.1409\n            },\n            \"ticketPricing\": \"$0 (fees for specific activities/shops)\",\n            \"timeToTravel\": \"Walking distance from Fremont Street.\"\n          },\n          {\n            \"placeName\": \"Binion's Gambling Hall\",\n            \"placeDetails\": \"Historic casino with a million-dollar display.  Free to view.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/BinionsGamblingHall.jpg/640px-BinionsGamblingHall.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1696,\n              \"longitude\": -115.1443\n            },\n            \"ticketPricing\": \"$0\",\n            \"timeToTravel\": \"Walking distance from Fremont Street.\"\n          }\n        ]\n      },\n      \"day3\": {\n        \"theme\": \"Hoover Dam & Relaxing\",\n        \"bestTimeToVisit\": \"Morning for Hoover Dam, Afternoon for Relaxation\",\n        \"activities\": [\n          {\n            \"placeName\": \"Hoover Dam\",\n            \"placeDetails\": \"Engineering marvel. Take a tour or just walk across the top. (Consider booking tours in advance online for best prices).\",\n            \"placeImageUrl\": \"https://www.usbr.gov/lc/hooverdam/images/HD-aerial.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.0157,\n              \"longitude\": -114.7372\n            },\n            \"ticketPricing\": \"$15-$30 (for tours). Parking fees apply.\",\n            \"timeToTravel\": \"45 minutes - 1 hour drive from Las Vegas. Consider a tour that includes transportation.\"\n          },\n           {\n            \"placeName\": \"High Roller Observation Wheel\",\n            \"placeDetails\": \"30 minutes for full rotation with bar access inside.\",\n            \"placeImageUrl\": \"https://static.toiimg.com/photo/msid-104405201,width-96,height-65.cms\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1159,\n              \"longitude\": -115.1625\n            },\n            \"ticketPricing\": \"$25-$40 (Prices vary by time of day and day of week)\",\n            \"timeToTravel\": \"It is located near LINQ Promenade\"\n          },\n          {\n            \"placeName\": \"Relax by the Pool\",\n            \"placeDetails\": \"Enjoy the pool at your hotel.  A good way to unwind after a busy couple of days.\",\n            \"placeImageUrl\": \"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hilton.com%2Fen%2Fhotels%2Flsvvvhh-hilton-grand-vacations-club-paradise-las-vegas%2Fgallery%2F&psig=AOvVaw1Rz-M2-5Xv4J12xL_y6981&ust=1718304141093000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDSi5jDzoYDFQAAAAAdAAAAABAE\",\n            \"geoCoordinates\": {\n              \"latitude\": null,\n              \"longitude\": null\n            },\n            \"ticketPricing\": \"$0 (included with hotel stay)\",\n            \"timeToTravel\": \"At your hotel.\"\n          }\n        ]\n      }\n    },\n    \"importantNotes\": [\n      \"Prices are estimates and can vary depending on the season and availability.\",\n      \"Consider purchasing a Las Vegas Monorail pass for easy transportation on the Strip (but evaluate if it's cheaper than using the Deuce bus or ride-sharing only when needed).\",\n      \"Take advantage of free activities like walking the Strip, watching the Bellagio fountains, and visiting the Bellagio Conservatory.\",\n      \"Look for happy hour deals and affordable dining options off the main Strip.\",\n      \"Stay hydrated! Las Vegas is in the desert and can be very hot.\",\n      \"Wear comfortable shoes – you'll be doing a lot of walking.\",\n       \"The 'Deuce' bus is a very affordable way to travel up and down the strip, but is slow.  It can be very crowded.\"\n    ]\n  }\n}\n```\n\n**Key Considerations for Budget Travel:**\n\n*   **Hotel Choice:** I've listed relatively inexpensive hotels.  Check for deals and compare prices on multiple booking sites. Consider hotels slightly off the Strip for potentially lower rates.  Also, look for deals that waive resort fees.\n*   **Transportation:** The Deuce bus is the most budget-friendly way to get around the Strip and downtown. Ride-sharing (Uber/Lyft) can be convenient but more expensive, especially during peak hours. Walking is a great option when the weather is pleasant.  Avoid taxis; they're generally the most expensive.\n*   **Food:** Avoid eating in the main casinos/hotels, as they're usually pricier. Look for affordable dining options off the Strip (e.g., chain restaurants, fast food).  Grocery stores can save you money on snacks and drinks.  Happy hour deals are also a great way to save.\n*   **Entertainment:** Focus on free attractions.  If you want to see a show, look for discount tickets (e.g., through Tix4Tonight booths).  Limit gambling to a small budget that you're prepared to lose.\n*   **Hoover Dam:** The cost of the Hoover Dam can be significant with tours and transportation. If your budget is tight, just driving there and walking around the top is free (except for parking).\n\nRemember to adjust this plan to your specific interests and preferences. Have a great time in Las Vegas!\n"},
          ],
        },
      ],
    });
  