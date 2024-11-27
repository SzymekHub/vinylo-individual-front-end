import React, { useState } from "react";
import useAddUser from "../hooks/useAddUser";

const RegisterUserForm = () => {
  const [usersItems, setUsersItems] = useState({ users: [] });
  const { registerUser, loading, error, registeredUserMessage } = useAddUser(
    usersItems,
    setUsersItems
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    registerUser(username, email, password);
  };

  return (
    <section className="bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Image Section */}
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1492284163710-4eef97892705?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        {/* Right Form Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-emerald-500" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.41 10.3847..." fill="currentColor" />
              </svg>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-emerald-500 sm:text-3xl md:text-4xl">
              Register Now
            </h1>

            <p className="mt-4 leading-relaxed text-emerald-300">
              Create an account to access exclusive features and start your
              journey.
            </p>

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              {/* Username Field */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-emerald-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  className="mt-1 w-full rounded-md border-emerald-700 bg-emerald-800 text-sm text-emerald-50 shadow-sm placeholder-emerald-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-emerald-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="mt-1 w-full rounded-md border-emerald-700 bg-emerald-800 text-sm text-emerald-50 shadow-sm placeholder-emerald-300"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-emerald-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="mt-1 w-full rounded-md border-emerald-700 bg-emerald-800 text-sm text-emerald-50 shadow-sm placeholder-emerald-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>

            {/* Error and Success Messages */}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            {registeredUserMessage && (
              <p className="mt-4 text-sm text-emerald-500">
                {registeredUserMessage}
              </p>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegisterUserForm;
