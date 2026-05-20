import {

  useEffect,
  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function HistoryPage() {

  const navigate = useNavigate();

  const [analyses, setAnalyses] =

    useState<any[]>([]);

  const [loading, setLoading] =

    useState(true);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {

          navigate("/login");

          return;
        }

        const response = await API.get(

          "/my-analyses",

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setAnalyses(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchHistory();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">

        Loading History...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-3xl md:text-5xl font-bold mb-10 md:mb-12">

          Analysis History

        </h1>

        {analyses.length === 0 ? (

          <div className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-10 text-center">

            <h2 className="text-3xl font-semibold mb-4">

              No Analyses Yet

            </h2>

            <p className="text-gray-400 mb-8">

              Start analyzing YouTube videos to see history here.

            </p>

            <button
              onClick={() =>
                navigate("/analyze")
              }
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
            >

              Analyze Now

            </button>

          </div>

        ) : (

          <div className="grid gap-8">

            {analyses.map((analysis) => (

              <div
                key={analysis._id}
                className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-5 md:p-8"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div className="flex-1">

                    <h2 className="text-2xl font-semibold mb-4 break-all">

                      {analysis.videoUrl}

                    </h2>

                    <p className="text-gray-400 mb-4 leading-relaxed">

                      {analysis.aiSummary?.slice(0, 180)}...

                    </p>

                    <div className="text-sm text-gray-500">

                      {new Date(
                        analysis.createdAt
                      ).toLocaleString()}

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/${analysis._id}`
                      )
                    }
                    className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >

                    Open Dashboard

                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default HistoryPage;