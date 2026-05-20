import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

function LandingPage() {
    const token = localStorage.getItem("token");

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">

          AI-Powered

          <span className="block text-gray-400">

            Emotion Intelligence

          </span>

        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-relaxed">

          Analyze YouTube comments and text using advanced AI models.

          Detect emotions, generate summaries, and visualize audience sentiment instantly.

        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-12">

          <Link
            to="/analyze"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
          >
            Analyze Now
          </Link>

          <Link
            to={token ? "/analyze" : "/signup"}
            className="border border-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-500 transition"
          >
            Get Started
          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-8 pb-28">

        <h2 className="text-4xl font-bold text-center mb-16">

          Powerful AI Features

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            title="Emotion Detection"
            description="Detect emotions like joy, anger, sadness, fear, surprise, and more using transformer-based AI models."
          />

          <FeatureCard
            title="AI Summaries"
            description="Generate intelligent summaries from thousands of YouTube comments automatically."
          />

          <FeatureCard
            title="Analytics Dashboard"
            description="Visualize audience sentiment with powerful charts, insights, and emotional analytics."
          />

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="max-w-6xl mx-auto px-8 pb-28">

        <h2 className="text-4xl font-bold text-center mb-16">

          How It Works

        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div>

            <div className="text-5xl font-bold text-gray-600 mb-4">

              01

            </div>

            <h3 className="text-2xl font-semibold mb-4">

              Paste URL

            </h3>

            <p className="text-gray-400">

              Enter a YouTube video URL or text input for analysis.

            </p>

          </div>

          <div>

            <div className="text-5xl font-bold text-gray-600 mb-4">

              02

            </div>

            <h3 className="text-2xl font-semibold mb-4">

              AI Processing

            </h3>

            <p className="text-gray-400">

              Our transformer models analyze emotions and sentiment instantly.

            </p>

          </div>

          <div>

            <div className="text-5xl font-bold text-gray-600 mb-4">

              03

            </div>

            <h3 className="text-2xl font-semibold mb-4">

              View Dashboard

            </h3>

            <p className="text-gray-400">

              Explore charts, summaries, and audience insights visually.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">

        Sentilytics AI © 2026

      </footer>

    </div>
  );
}

export default LandingPage;