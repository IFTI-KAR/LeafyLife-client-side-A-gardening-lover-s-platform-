import React from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        src="https://illustrations.popsy.co/gray/error-page.svg"
        alt="404 Not Found"
        className="w-full max-w-md mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you're looking for doesn’t exist or has been moved. Let’s get you back home!
      </p>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        <FaArrowLeft className="mr-2" />
        Go Back
      </button>
    </div>
  );
};

export default Error;