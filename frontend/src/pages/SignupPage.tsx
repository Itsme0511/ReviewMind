import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function SignupPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSignup = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response = await API.post(

        "/auth/signup",

        {
          name,
          email,
          password
        }
      );

      localStorage.setItem(

        "token",

        response.data.token
      );

      navigate("/analyze");

    } catch (error: any) {

      setError(

        error.response?.data?.error ||

        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl p-6 md:p-8"
      >

        <h1 className="text-4xl font-bold text-white mb-8 text-center">

          Create Account

        </h1>

        {error && (

          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-6">

            {error}

          </div>
        )}

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 text-white outline-none focus:border-white"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 text-white outline-none focus:border-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 text-white outline-none focus:border-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >

            {loading ?

              "Creating Account..." :

              "Sign Up"
            }

          </button>

        </div>

      </form>

    </div>
  );
}

export default SignupPage;