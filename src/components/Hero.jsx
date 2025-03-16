import React from 'react';
import { Link } from 'react-router-dom';
import travel from "../assets/travel.webp";

const Hero = () => {
  return (
    <div className='flex flex-col items-center px-4 md:px-16 lg:px-56 gap-9'>
      <h1 className='font-extrabold text-3xl md:text-4xl lg:text-[45px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span>
        <br />
        Personalized Itineraries at your Fingertips
      </h1>
      <p className='text-base md:text-lg lg:text-xl text-gray-500 text-center'>
        Your personal trip planner and travel curator, creating 
        custom itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <button className='bg-[#f56551] text-white py-3 px-6 rounded-md hover:bg-[#f56551] transition duration-300 ease-in-out cursor-pointer'>
          Get Started, It's Free
        </button>
      </Link>

      <img src={travel} alt="Hero" className='px-0 md:px-16 lg:px-56' />
    </div>
  );
};

export default Hero;
