import axios from "axios";
// const axios = require("axios");

const AI_BASE_URL = process.env.AI_SERVICE_URL;

export const analyzeYouTubeVideo = async (
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

    console.error(
      "AI Service Error:",
      error.response?.data ||
      error.message
    );

    throw new Error(

      error.response?.data?.detail ||

      "Failed to communicate with AI service"
    );
}
}

export const analyzeTextAI = async (

  text: string

) => {

  try {

    const response = await axios.post(

      `${AI_BASE_URL}/analyze-text`,

      { text }
    );

    return response.data;

  } catch (error: any) {

    throw new Error(

      error.response?.data?.detail ||

      "Failed to communicate with AI service"
    );
}}
