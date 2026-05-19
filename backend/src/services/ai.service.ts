import axios from "axios";
// const axios = require("axios");

const AI_BASE_URL = "http://127.0.0.1:8000";

const analyzeYouTubeVideo = async (
  url: string,
  maxComments: number = 100
) => {

  try {

    const response = await axios.post(
      `${AI_BASE_URL}/analyze-youtube`,
      {
        url,
        max_comments: maxComments
      }
    );

    return response.data;

  } catch (error: any) {

    console.error("AI Service Error:", error.message);

    throw new Error(
      "Failed to communicate with AI service"
    );
  }
};

export default analyzeYouTubeVideo;