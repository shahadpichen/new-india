import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnonAadhaar, useProver } from "@anon-aadhaar/react";
import { indianStates, getPincodeDetails } from "../data/indianData";
import { createPetition } from "../services/petitionService";
import { toast } from "react-hot-toast";

function SubmitPetition() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: "",
    location: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pincodeDetails, setPincodeDetails] = useState(null);

  // Add useEffect to set pincode from AnonAadhaar proof
  useEffect(() => {
    if (latestProof?.proof?.pincode) {
      setFormData((prev) => ({
        ...prev,
        pincode: latestProof.proof.pincode,
      }));
    }
  }, [latestProof]);

  // Validate pincode and fetch details
  useEffect(() => {
    const validatePincode = async () => {
      if (formData.pincode.length === 6) {
        const details = await getPincodeDetails(formData.pincode);
        setPincodeDetails(details);
        if (details) {
          setFormData((prev) => ({
            ...prev,
            state: details.state,
            location: details.city,
          }));
          setErrors((prev) => ({
            ...prev,
            pincode: null,
            state: null,
            location: null,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            pincode: "Invalid pincode",
          }));
        }
      }
    };

    validatePincode();
  }, [formData.pincode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!pincodeDetails) newErrors.pincode = "Please enter a valid pincode";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const petitionData = {
          title: formData.title,
          description: formData.description,
          state: formData.state,
          location: formData.location,
          pincode: formData.pincode,
          pincodeDetails: pincodeDetails,
          supporters: 0,
          anonAadhaarProof: latestProof,
        };

        const { data, error } = await createPetition(petitionData);

        if (error) {
          toast.error("Failed to submit petition. Please try again.");
          console.error("Submission error:", error);
        } else {
          toast.success("Petition submitted successfully!");
          navigate("/petitions");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  // Redirect if not logged in with Anon Aadhaar
  if (anonAadhaar?.status !== "logged-in") {
    navigate("/");
    return (
      <div>
        Not verified. Please login using Anon-Aadhaar to submit petition.
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center max-w-2xl mx-auto p-6 h-screen">
      <h1 className="text-2xl font-semibold mb-6">Submit Anonymous Petition</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Petition Title*
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter petition title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full px-3 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Describe your petition in detail"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="max-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode*
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            placeholder="Pincode from your proof"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State*
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              disabled={pincodeDetails}
              className={`w-full px-3 py-2 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={pincodeDetails}
              className={`w-full px-3 py-2 border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter city/location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Petition"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/petitions")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Your petition will be submitted anonymously.
      </p>
    </div>
  );
}

export default SubmitPetition;
