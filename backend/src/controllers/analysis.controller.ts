import type { Request, Response } from "express";
import {analyzeYouTubeVideo, analyzeTextAI,analyzeAmazonProduct} from "../services/ai.service";
import Analysis from "../models/analysis.model";
import type {AuthRequest} from "../middleware/auth.middleware";


interface AnalyzeRequestBody {
  url: string;
  maxComments?: number;
}

export const analyzeYouTube = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { url, maxComments } = req.body as any;

    if (!url) {
      return res.status(400).json({
        error: "YouTube URL is required"
      });
    }

    const result = await analyzeYouTubeVideo(
      url,
      maxComments || 100
    );
    
    const savedAnalysis =
      await Analysis.create({
        userId: req.user.userId,
        videoUrl: url,
        totalComments: result.total_comments,
        emotionDistribution: result.emotion_distribution,
        sentimentDistribution: result.sentiment_distribution,
        topPositiveComment: result.top_positive_comment,
        topNegativeComment: result.top_negative_comment,
        aiSummary: result.ai_summary });

    return res.json({
      message:
        "Analysis completed successfully",

      analysis: savedAnalysis,

      aiResult: result
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message
    });
  }
};

export const getMyAnalyses = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const analyses =
      await Analysis.find({

        userId: req.user.userId

      }).sort({

        createdAt: -1
      });

    return res.json(analyses);

  } catch (error: any) {

    return res.status(500).json({
      error: error.message
    });
  }
};

export const getAnalysisById = async (

  req: Request,

  res: Response

) => {

  try {

    const analysis = await Analysis.findById(

      req.params.id
    );

    if (!analysis) {

      return res.status(404).json({
        error: "Analysis not found"
      });
    }

    return res.json(analysis);

  } catch (error: any) {

    return res.status(500).json({
      error: error.message
    });
  }
};

export const analyzeText = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const { text } = req.body;

    if (!text) {

      return res.status(400).json({

        error: "Text is required"
      });
    }

    const result =

      await analyzeTextAI(text);

    return res.json(result);

  } catch (error: any) {

    return res.status(500).json({

      error: error.message
    });
  }
};


export const analyzeAmazon = async (

  req: AuthRequest,

  res: Response

) => {

  try {

    const { url } = req.body;

    if (!url) {

      return res.status(400).json({

        error: "Amazon product URL is required"
      });
    }

    const result = await analyzeAmazonProduct(
      url
    );

    const savedAnalysis =

      await Analysis.create({

        userId: req.user.userId,

        videoUrl: url,

        totalComments:
          result.total_reviews,

        emotionDistribution:
          result.emotion_distribution,

        sentimentDistribution:
          result.sentiment_distribution,

        topPositiveComment:
          result.top_positive_review,

        topNegativeComment:
          result.top_negative_review,

        aiSummary:
          result.ai_summary
      });

    return res.json({

      message:
        "Amazon analysis completed successfully",

      analysis: savedAnalysis,

      aiResult: result
    });

  } catch (error: any) {

    return res.status(500).json({

      error:
        error.message ||

        "Amazon analysis failed"
    });
  }
};