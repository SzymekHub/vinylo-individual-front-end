import React, { useState } from "react";
import useAddUser from "../hooks/add/useAddUser";

const RegisterUserForm = ({ onRegisterSuccess }) => {
  const [usersItems, setUsersItems] = useState({ users: [] });
  const { registerUser, loading, error, registeredUserMessage } = useAddUser(
    usersItems,
    setUsersItems,
    onRegisterSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    registerUser(username, email, password);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-10xl h-[800px] bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 flex rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1492284163710-4eef97892705?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-emerald-400 drop-shadow-lg">
                Register Now
              </h1>
              <p className="mt-2 text-sm text-emerald-300">
                Create an account to access exclusive features and start your
                journey.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-lg shadow-lg bg-gradient-to-br from-emerald-800/50 to-gray-900/50 backdrop-blur-sm p-8 space-y-4">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-emerald-300"
                  >
                    Username :
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    data-cy="input-username"
                    placeholder="Enter username"
                    className="mt-1 w-full px-3 py-2 border border-emerald-600/30 rounded-md bg-emerald-900/30 text-emerald-100 placeholder-emerald-300/75 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-emerald-300"
                  >
                    Email :
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-cy="input-email"
                    placeholder="Enter email"
                    className="mt-1 w-full px-3 py-2 border border-emerald-600/30 rounded-md bg-emerald-900/30 text-emerald-100 placeholder-emerald-300/75 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-emerald-300"
                  >
                    Password :
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    data-cy="input-password"
                    placeholder="Enter password"
                    className="mt-1 w-full px-3 py-2 border border-emerald-600/30 rounded-md bg-emerald-900/30 text-emerald-100 placeholder-emerald-300/75 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    data-cy="register-button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            </form>

            {/* Error and Success Messages */}
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}
            {registeredUserMessage && (
              <p className="mt-2 text-sm text-emerald-500 text-center">
                {registeredUserMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserForm;
