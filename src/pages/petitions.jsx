import React, { useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";

const Petitions = () => {
  const [selectedState, setSelectedState] = useState("Select State");
  const [pincode, setPincode] = useState("");

  // Sample states - you can expand this list
  const indianStates = [
    "Andhra Pradesh",
    "Delhi",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Tamil Nadu",
    "Uttar Pradesh",
    // Add more states as needed
  ];

  // Updated petitions data with location information
  const petitions = [
    {
      id: 1,
      title: "Improve Road Infrastructure",
      description:
        "Petition for better roads and infrastructure in our locality. The current state of roads is causing inconvenience to daily commuters and affecting the overall quality of life.",
      supporters: 234,
      state: "Maharashtra",
      location: "Mumbai",
      pincode: "400001",
    },
    {
      id: 2,
      title: "Clean Water Supply",
      description:
        "Demanding regular clean water supply in our neighborhood. Access to clean water is a basic human right, and it's essential for public health and hygiene.",
      supporters: 156,
      state: "Karnataka",
      location: "Bangalore",
      pincode: "560001",
    },
    {
      id: 1,
      title: "Improve Road Infrastructure",
      description:
        "Petition for better roads and infrastructure in our locality. The current state of roads is causing inconvenience to daily commuters and affecting the overall quality of life.",
      supporters: 234,
      state: "Maharashtra",
      location: "Mumbai",
      pincode: "400001",
    },
    {
      id: 2,
      title: "Clean Water Supply",
      description:
        "Demanding regular clean water supply in our neighborhood. Access to clean water is a basic human right, and it's essential for public health and hygiene.",
      supporters: 156,
      state: "Karnataka",
      location: "Bangalore",
      pincode: "560001",
    },
    {
      id: 1,
      title: "Improve Road Infrastructure",
      description:
        "Petition for better roads and infrastructure in our locality. The current state of roads is causing inconvenience to daily commuters and affecting the overall quality of life.",
      supporters: 234,
      state: "Maharashtra",
      location: "Mumbai",
      pincode: "400001",
    },
    {
      id: 2,
      title: "Clean Water Supply",
      description:
        "Demanding regular clean water supply in our neighborhood. Access to clean water is a basic human right, and it's essential for public health and hygiene.",
      supporters: 156,
      state: "Karnataka",
      location: "Bangalore",
      pincode: "560001",
    },
    // ... other petitions with location data
  ];

  return (
    <div className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-6xl mx-auto flex">
        {/* Sidebar */}
        <aside className="flex flex-col my-[5vh] justify-between w-80 py-10 pl-6 border-r space-y-6">
          {/* Project Name */}
          <div className="flex flex-col justify-between">
            <div
              className="text-2xl text-end font-bold mb-8 pr-6"
              style={{
                WebkitTextFillColor: "#FFFFFF",
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#000",
              }}
            >
              Anon-Petition
            </div>

            {/* Location Filters */}
            <div className="flex flex-col text-sm items-end space-y-4">
              <button className="w-1/2 py-2 px-4 bg-orange-100 text-orange-600 font-semibold">
                India
              </button>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-1/2 py-2 px-4 border border-r-0 focus:outline-none focus:border-orange-500"
              >
                <option disabled>Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-1/2 py-2 px-4 border border-r-0 focus:outline-none focus:border-orange-500"
                maxLength={6}
              />
            </div>
          </div>
          {/* Privacy Information */}
          <div className="mt-auto pt-6 pr-1 border-t space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <p>Powered by Anon Aadhaar for secure verification</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <p>Your identity remains completely anonymous</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 h-screen overflow-y-auto">
          {/* Petitions List */}
          <div className="max-w-3xl mx-auto space-y-6 ">
            {petitions.map((petition) => (
              <div
                key={petition.id}
                className="flex justify-between border gap-5 border-gray-200 rounded-sm p-4 shadow-sm hover:bg-gray-50 transition-shadow"
              >
                <div className="flex flex-col">
                  <h2 className="text-lg font-medium mb-1">{petition.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {petition.description}
                  </p>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {petition.state}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {petition.location}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      PIN: {petition.pincode}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center text-sm">
                  <button className="flex flex-col items-center justify-center rounded-sm px-3 py-1 border border-orange-400 text-orange-400 font-medium hover:bg-orange-100 transition-colors">
                    <BiSolidUpArrow />
                    {petition.supporters}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Petitions;
