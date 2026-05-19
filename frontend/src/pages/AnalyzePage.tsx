import {useEffect,useState} from "react";

import {useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function AnalyzePage() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =

    useState("youtube");

  const [youtubeUrl, setYoutubeUrl] =

    useState("");

  const [text, setText] =

    useState("");

  const [loading, setLoading] =

    useState(false);

  const [error, setError] =

    useState("");
  const [maxComments, setMaxComments] =

    useState(50);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");
    }

  }, []);

  const handleYouTubeAnalysis = async () => {

    try {

      setLoading(true);

      setError("");

      const token = localStorage.getItem("token");

      const response = await API.post(

        "/analyze-youtube",

        {
          url: youtubeUrl,
          maxComments
        },

        {
          headers: {

            Authorization:

              `Bearer ${token}`
          }
        }
      );

      const analysisId =

        response.data.analysis._id;

      navigate(`/dashboard/${analysisId}`);

    } catch (error: any) {

      setError(

        error.response?.data?.error ||

        "Analysis failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-center mb-12">

          AI Sentiment Analysis

        </h1>

        {/* TABS */}

        <div className="flex justify-center gap-4 mb-10">

          <button
            onClick={() =>
              setActiveTab("youtube")
            }
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "youtube"

                ? "bg-white text-black"

                : "bg-[#111111] border border-gray-700"
            }`}
          >

            YouTube Analysis

          </button>

          <button
            onClick={() =>
              setActiveTab("text")
            }
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "text"

                ? "bg-white text-black"

                : "bg-[#111111] border border-gray-700"
            }`}
          >

            Text Analysis

          </button>

        </div>

        {/* ERROR */}

        {error && (

          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl mb-8">

            {error}

          </div>
        )}

        {/* YOUTUBE */}

        {activeTab === "youtube" && (

          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8">

            <h2 className="text-3xl font-semibold mb-6">

              Analyze YouTube Comments

            </h2>

            <input
              type="text"
              placeholder="Paste YouTube URL..."
              value={youtubeUrl}
              onChange={(e) =>
                setYoutubeUrl(e.target.value)
              }
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white mb-6"
            />
            
            <div className="mb-6">

                <label className="block text-gray-400 mb-3">

                    Number of Comments

                </label>

                <input
                    type="number"

                    min={10}

                    max={500}

                    value={maxComments}

                    onChange={(e) =>

                    setMaxComments(

                        Number(e.target.value)
                    )
                    }

                    className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />

                </div>

            <button
              onClick={handleYouTubeAnalysis}
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
            >

              {loading ?

                "Analyzing..." :

                "Analyze Video"
              }

            </button>

          </div>
        )}

        {/* TEXT */}

        {activeTab === "text" && (

          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8">

            <h2 className="text-3xl font-semibold mb-6">

              Analyze Text Emotion

            </h2>

            <textarea
              placeholder="Enter text..."
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              rows={6}
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white mb-6"
            />

            <button
              disabled
              className="w-full bg-gray-700 text-gray-400 py-4 rounded-xl font-semibold cursor-not-allowed"
            >

              Coming Soon

            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default AnalyzePage;