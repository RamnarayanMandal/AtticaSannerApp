import { useState, useRef } from 'react';
import img from "../assets/sing.png";
import axios from "axios";

export default function Form() {
  const [panShopOwner, setPanShopOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const panShopOwnerRef = useRef();
  const phoneNumberRef = useRef();
  const streetAddressRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const regionRef = useRef();
  const postalCodeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the form data object
    const formData = {
      panShopOwner: panShopOwnerRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      address: streetAddressRef.current.value,
      state: stateRef.current.value,
      city: cityRef.current.value,
      postalCode: postalCodeRef.current.value,
      latitude,
      longitude
    };
  console.log(formData)
    // Submit formData to backend
    try {
      // const response = await axios.post("http://localhost:5001/api/panshopowner", formData);
      // console.log("Form data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex mx-20 my-10 border-2 rounded ">
      <div className="object-cover lg:w-1/2 hidden md:block lg:block ">
        <img src={img} alt="singn" className="w-full" />
      </div>
      <div className=" lg:w-1/2 w-full ">
        <form className="lg:p-10 lg:pt-32 p-5" onSubmit={handleSubmit}>
          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12">
              <h1 className="text-base font-semibold leading-7 text-gray-900 text-center lg:text-3xl text-xl font-bold">
                Registration Form
              </h1>

              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="panShopOwner"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pan Shop Owner
                  </label>
                  <div className="mt-2">
                    <input
                      ref={panShopOwnerRef}
                      type="text"
                      name="panShopOwner"
                      id="panShopOwner"
                      autoComplete="off"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      ref={phoneNumberRef}
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="off"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      ref={streetAddressRef}
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      autoComplete="off"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      ref={cityRef}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input 
                      ref={stateRef}
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="address-level1"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  > 
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      ref={postalCodeRef}
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      autoComplete="postal-code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit" onClick={getCurrentLocation}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
            <button
              type="button"
              
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
