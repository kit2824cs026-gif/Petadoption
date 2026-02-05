import React from "react";

function Profile() {
  // Reading the data you saved in Registerform
  const userName = localStorage.getItem("userName") || "Guest";
  const userEmail = localStorage.getItem("userEmail") || "Not logged in";

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-md mx-auto bg-white rounded-[30px] shadow-lg p-8 border border-blue-100">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 uppercase">
            {userName[0]}
          </div>
          <h2 className="text-2xl font-bold text-blue-900">My Profile</h2>
        </div>

        <div className="space-y-6">
          {/* User Details Section */}
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">
              Full Name
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {userName}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">
              Email Address
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {userEmail}
            </p>
          </div>

          {/* Adopted Pets Section */}
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-xs text-gray-400 font-bold uppercase mb-2">
              Adopted Pets
            </p>
            <p className="text-sm text-gray-600 italic mb-4">
              No pets adopted yet.
            </p>

            {/* Sell My Pets Button Added Here */}
            <button
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-xl hover:bg-blue-600 transition shadow-sm mb-2"
              onClick={() => alert("Selling page-ku poguthu...")}
            >
              Sell My Pets
            </button>
          </div>

          {/* Logout/Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-full hover:bg-blue-800 transition shadow-md"
          >
            Go Back to Gallery
          </button>
          
          <button
            onClick={() => alert("Logged out!")}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-full hover:bg-red-600 transition shadow-md mt-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;