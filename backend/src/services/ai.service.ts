import axios from "axios";
// const axios = require("axios");

// const AI_BASE_URL = process.env.AI_SERVICE_URL;
// console.log(
//   "AI URL:",
//   AI_BASE_URL
// );

export const analyzeYouTubeVideo = async (
  url: string,
  maxComments: number = 100
) => {

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-youtube",
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

      "http://127.0.0.1:8000/analyze-text",

      { text }
    );

    return response.data;

  } catch (error: any) {

    throw new Error(

      error.response?.data?.detail ||

      "Failed to communicate with AI service"
    );
}}

export const analyzeAmazonProduct = async (

  url: string

) => {

  try {

    const response = await axios.post(

      "http://127.0.0.1:8000/analyze-amazon",

      { url }
    );

    return response.data;

  } catch (error: any) {

    throw new Error(

      error.response?.data?.detail ||

      "Failed to communicate with AI service"
    );
  }
};