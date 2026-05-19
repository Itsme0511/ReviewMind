import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <nav className="w-full flex items-center justify-between px-8 py-6 border-b border-gray-800">

      <Link
        to="/"
        className="text-2xl font-bold text-white"
      >

        Sentilytics AI

      </Link>

      <div className="flex items-center gap-6">

        {token ? (

          <>
            <Link
              to="/analyze"
              className="text-gray-300 hover:text-white transition"
            >
              Analyze
            </Link>

            <Link
              to="/history"
              className="text-gray-300 hover:text-white transition"
            >
              History
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;