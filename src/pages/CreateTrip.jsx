import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { toast } from 'sonner';
import { chatSession } from '../service/AImodel';
import logo from '../assets/logo.webp';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    location: '',
    days: '',
    budget: '',
    travellers: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.days > 5 || !formData?.location || !formData?.budget || !formData?.travellers) {
      toast.error("Please fill all the details for the trip!");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.days)
      .replace('{traveler}', formData?.travellers)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.days);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    SaveAiTrip(result?.response?.text());
    setLoading(false);
    toast.success("Trip Generated Successfully!");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate(`/trip/${docId}`);
  };

  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56 mt-10'>
      <h2 className='font-bold text-2xl sm:text-3xl text-center sm:text-left'>
        Tell us your travel preferences 🏕️
      </h2>
      <p className='mt-3 text-gray-500 text-lg sm:text-xl text-center sm:text-left'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-10 sm:mt-20 mb-10'>
        <h2 className='text-lg sm:text-xl my-3 font-medium'>What is your destination of choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange: (place) => { setPlace(place); handleInputChange('location', place) }
          }}
          placeholder="Search for a destination"
        />
      </div>

      <div className='mb-10'>
        <h2 className='text-lg sm:text-xl my-3 font-medium'>How many days would you like to spend there?</h2>
        <input
          className='border border-gray-300 rounded-md p-2 w-full'
          placeholder='Ex. 2'
          type="number"
          min="1"
          max="5"
          onChange={(e) => handleInputChange('days', parseInt(e.target.value, 10))}
        />
      </div>

      <div className='mb-10'>
        <h2 className='text-lg sm:text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border-2 cursor-pointer rounded-lg hover:shadow-md text-center
              ${formData?.budget === item.title ? 'border-black shadow-lg' : 'border-gray-300'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-10'>
        <h2 className='text-lg sm:text-xl my-3 font-medium'>Who do you plan on traveling with?</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('travellers', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-md text-center
              ${formData?.travellers === item.people ? 'shadow-lg border-2 border-black' : 'border-gray-300'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 flex justify-center sm:justify-end'>
        <button
          onClick={onGenerateTrip}
          disabled={loading || !formData?.location || !formData?.days || !formData?.budget || !formData?.travellers}
          className={`py-3 px-6 rounded-md transition duration-300 ease-in-out cursor-pointer
    ${!formData?.location || !formData?.days || !formData?.budget || !formData?.travellers ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f56551] text-white hover:bg-[#f56551]'}`}
        >
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
