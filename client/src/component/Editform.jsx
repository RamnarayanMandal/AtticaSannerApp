import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Editform = ({userData}) => {
  const [error, setError] = useState('');
  const panShopOwnerRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const streetAddressRef = useRef(null);
  const navigate = useNavigate()
  const handleSubmit = (e) => {  

    e.preventDefault();
    const panShopOwner = panShopOwnerRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const streetAddress = streetAddressRef.current.value;

    // Validate form fields here if needed
    if (!panShopOwner || !phoneNumber || !streetAddress) {
      setError('Please fill out all fields.');
      return;
    }

    // Handle form submission, such as making API requests
    console.log('Shopkeeper Name:', panShopOwner);
    console.log('Phone Number:', phoneNumber);
    console.log('Street Address:', streetAddress);
    navigate("/qrDetail")
    // Reset error state
    setError('');
  };

  const getCurrentLocation = () => {
    // Implement geolocation logic here if needed
    console.log('Getting current location...');
  };

  return (
    <div className="w-full   overflow-hidden  rounded-t-3xl lg:rounded-lg h-full ">
      <h2 className="mt-2 text-center font-heading leading-9 tracking-tight ">
        Edit 
      </h2>
      <form className="mt-6 p-10 lg:py-3 px-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="panShopOwner" className="block font  leading-6">
            Shopkeeper Name
          </label>
          <input
            id="panShopOwner"
            type="text"
            ref={panShopOwnerRef}
            required
            className="block w-full  text-black  mt-1 rounded-xl border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-3 px-4"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phoneNumber" className="block font leading-6 ">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="number"
            ref={phoneNumberRef}
            required
            className="block w-full mt-1   text-black  rounded-xl border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-3 px-4"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="streetAddress" className="block font leading-6 ">
            Street Address
          </label>
          <input
            id="streetAddress"
            type="text"
            ref={streetAddressRef}
            required
            className="block w-full mt-1 rounded-xl border-gray-300 text-black shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-3 px-4"
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            onClick={getCurrentLocation}
            className="rounded-xl  bg-green-700 px-10 py-3 text-md font-bold text-white shadow-md  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
         
        </div>
      </form>
    </div>
  );
};
