import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema({
    
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

  videoUrl: {
    type: String,
    required: true
  },

  totalComments: {
    type: Number
  },

  emotionDistribution: {
    type: Object
  },

  sentimentDistribution: {
    type: Object
  },

  topPositiveComment: {
    type: String
  },

  topNegativeComment: {
    type: String
  },

  aiSummary: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Analysis = mongoose.model(
  "Analysis",
  AnalysisSchema
);

export default Analysis;