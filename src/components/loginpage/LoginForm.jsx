import React, { useState } from "react";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 flex items-center justify-center py-1 px-0 rounded-full">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-emerald-400 drop-shadow-lg">
            Log in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-emerald-800/50 to-gray-900/50 backdrop-blur-sm p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-emerald-600/30 placeholder-emerald-300/75 text-emerald-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm bg-emerald-900/30 backdrop-blur-sm transition-all duration-300"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-emerald-600/30 placeholder-emerald-300/75 text-emerald-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm bg-emerald-900/30 backdrop-blur-sm transition-all duration-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
