import express from "express";
import { analyzeYouTube,getMyAnalyses,getAnalysisById,analyzeText,analyzeAmazon } from "../controllers/analysis.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();


router.post("/analyze-youtube",authMiddleware,analyzeYouTube);
router.get("/my-analyses",authMiddleware,getMyAnalyses);
router.get("/analysis/:id",authMiddleware,getAnalysisById);
router.post("/analyze-text",authMiddleware,analyzeText);
router.post("/analyze-amazon", authMiddleware, analyzeAmazon);

export default router;