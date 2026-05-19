import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer,BarChart,Bar,XAxis,YAxis} from "recharts";
import Navbar from "../components/Navbar";
import API from "../services/api";

const EMOTION_COLORS = [

  "#6366F1", // indigo
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#F59E0B", // amber
  "#10B981", // emerald
  "#EF4444", // red
  "#06B6D4", // cyan
];

const SENTIMENT_COLORS = [

  "#22C55E", // positive

  "#EF4444", // negative

  "#A855F7", // neutral
];

function DashboardPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [analysis, setAnalysis] =

    useState<any>(null);

  const [loading, setLoading] =

    useState(true);

  useEffect(() => {

    const fetchAnalysis = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {

          navigate("/login");

          return;
        }

        const response = await API.get(

          `/analysis/${id}`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setAnalysis(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchAnalysis();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">

        Loading Dashboard...

      </div>
    );
  }

  const emotionData =

    Object.entries(

      analysis.emotionDistribution

    ).map(

      ([name, value]) => ({

        name,
        value
      })
    );

  const sentimentData =

    Object.entries(

      analysis.sentimentDistribution

    ).map(

      ([name, value]) => ({

        name,
        value
      })
    );

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold mb-10">

          Analysis Dashboard

        </h1>

        {/* SUMMARY */}

        <div className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-8 mb-10">

          <h2 className="text-3xl font-semibold mb-6">

            AI Summary

          </h2>

          <p className="text-gray-300 leading-relaxed text-lg">

            {analysis.aiSummary}

          </p>

        </div>

        {/* CHARTS */}

        <div className="grid md:grid-cols-2 gap-10 mb-10">

          {/* EMOTIONS */}

          <div className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-8 h-[450px]">

            <h2 className="text-2xl font-semibold mb-6">

              Emotion Distribution

            </h2>

            <ResponsiveContainer
  width="100%"
  height="100%"
>

              <PieChart>

                {/* <Pie
                  data={emotionData}
                  dataKey="value"
                  outerRadius={120}
                  label
                > */}
                <Pie

                    isAnimationActive={true}

                    animationDuration={1200}

                    data={emotionData}

                    dataKey="value"

                    outerRadius={120}

                    innerRadius={60}

                    paddingAngle={3}

                    labelLine={false}

                    label={({

                        name,
                        percent

                    }) =>

                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    >

                  {emotionData.map((_, index) => (
                    <Cell
                        key={index}

                        fill={
                            EMOTION_COLORS[
                            index % EMOTION_COLORS.length
                            ]
                        }
                        />

                  ))}

                </Pie>

                {/* <Tooltip /> */}
                <Tooltip

                    contentStyle={{

                        backgroundColor: "#111111",

                        border: "1px solid #333",

                        borderRadius: "12px",

                        color: "white"
                    }}
                    />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* SENTIMENT */}

          <div className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-8 h-[450px]">

            <h2 className="text-2xl font-semibold mb-6">

              Sentiment Analysis

            </h2>

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={sentimentData}
              >

                <XAxis
                    dataKey="name"

                    stroke="#9CA3AF"
                    />

                <YAxis
                    stroke="#9CA3AF"
                    />

                <Tooltip

                    contentStyle={{

                        backgroundColor: "#111111",

                        border: "1px solid #333",

                        borderRadius: "12px",

                        color: "white"
                    }}
                    />

                {/* <Bar dataKey="value" /> */}
                <Bar
                    animationDuration={1200}

                    dataKey="value"

                    radius={[10, 10, 0, 0]}
                    >
                    {sentimentData.map(

                        (_, index) => (

                        <Cell
                            key={index}

                            fill={
                            SENTIMENT_COLORS[index]
                            }
                        />
                        )
                    )}
                    </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* COMMENTS */}

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-6">

              Top Positive Comment

            </h2>

            <p className="text-gray-300 leading-relaxed">

              {analysis.topPositiveComment}

            </p>

          </div>

          <div className="bg-[#0f0f0f] border border-gray-700 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-6">

              Top Negative Comment

            </h2>

            <p className="text-gray-300 leading-relaxed">

              {analysis.topNegativeComment}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;