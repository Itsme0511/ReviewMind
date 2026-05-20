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

  const [loadingStep, setLoadingStep] =

    useState("");

  const [error, setError] =

    useState("");
  const [textResult, setTextResult] =

    useState<any>(null);

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

        setLoadingStep("Fetching YouTube comments...");

      const token = localStorage.getItem("token");
      await new Promise(

                resolve => setTimeout(resolve, 700)
            );

            setLoadingStep("Analyzing audience emotions...");

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

      const analysisId = response.data.analysis._id;
        setLoadingStep("Preparing analytics dashboard...");
            await new Promise(
            resolve => setTimeout(resolve, 700)
            );
        navigate(`/dashboard/${analysisId}`);

    } catch (error: any) {

      setError(

        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Analysis failed"
      );

    } finally {

      setLoading(false);
    }
  };
  const handleTextAnalysis = async () => {

    try {

        setLoading(true);
        setLoadingStep("Analyzing text emotions...");

        setError("");
        setTextResult(null);

        const token = localStorage.getItem("token");


        const response = await API.post(

        "/analyze-text",

        { text },

        {
            headers: {

            Authorization:
                `Bearer ${token}`
            }
        }
        );

        setTextResult(response.data);

    } catch (error: any) {

        setError(

        error.response?.data?.error ||

        "Text analysis failed"
        );

    } finally {

        setLoading(false);
    }
    };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">

        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-12">

          AI Sentiment Analysis

        </h1>

        {/* TABS */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">

          <button
            onClick={() =>{
                setActiveTab("youtube")
                setTextResult(null);}
            }
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "youtube"

                ? "bg-white text-black"

                : "bg-[#111111] border border-gray-700"
            }`}
          >

            YouTube Analysis

          </button>

          <button
                onClick={() => {
                    setActiveTab("text");
                    setError("");
                }}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition ${
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
                    {!loading && (

                        <button
                            onClick={handleYouTubeAnalysis}

                            disabled={loading}

                            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                        >

                            Analyze Video

                        </button>

                        )}

                        {loading && (

                        <div className="mt-8 bg-black border border-gray-700 rounded-2xl p-6">

                            <div className="flex items-center gap-4 mb-4">

                            <div className="w-10 h-10 border-4 border-gray-700 border-t-white rounded-full animate-spin">

                            </div>

                            <h3 className="text-xl font-semibold">

                                AI Analysis In Progress

                            </h3>

                            </div>

                            <div className="space-y-4">

                            <div className="bg-[#111111] border border-gray-800 rounded-xl p-4">

                                <p className="text-gray-300">

                                {loadingStep}

                                </p>

                            </div>

                            <div className="w-full bg-[#111111] rounded-full h-3 overflow-hidden">

                                <div className="bg-white h-full animate-[pulse_1.5s_ease-in-out_infinite] w-3/4 rounded-full">

                                </div>

                            </div>

                            </div>

                        </div>

                        )}
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
                onClick={handleTextAnalysis}

                disabled={loading}

                className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                >

                {loading ?

                    "Analyzing..." :

                    "Analyze Text"
                }

                </button>
                {textResult && (

                    <div className="mt-8 bg-black border border-gray-700 rounded-2xl p-6">

                        <h3 className="text-2xl font-semibold mb-6">

                        Analysis Result

                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-[#111111] border border-gray-800 rounded-xl p-5">

                            <p className="text-gray-400 mb-2">

                            Emotion

                            </p>

                            <h4 className="text-3xl font-bold capitalize">

                            {textResult.emotion}

                            </h4>

                        </div>

                        <div className="bg-[#111111] border border-gray-800 rounded-xl p-5">

                            <p className="text-gray-400 mb-2">

                            Sentiment

                            </p>

                            <h4 className="text-3xl font-bold capitalize">

                            {textResult.sentiment}

                            </h4>

                        </div>

                        </div>

                        <div className="mt-6 bg-[#111111] border border-gray-800 rounded-xl p-5">

                        <p className="text-gray-400 mb-2">

                            Confidence Score

                        </p>

                        <h4 className="text-3xl font-bold">

                            {(textResult.emotion_score * 100).toFixed(1)}%

                        </h4>

                        </div>

                    </div>
                    )}

          </div>
        )}

      </div>

    </div>
  );
}

export default AnalyzePage;