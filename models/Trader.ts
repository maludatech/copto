import mongoose from "mongoose";

const TraderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  avatar: { type: String, default: "/placeholder.svg" },
  verified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  roi: {
    daily: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    monthly: { type: Number, default: 0 },
    yearly: { type: Number, default: 0 },
  },
  winRate: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  trades: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 },
  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  tradingStyles: [{ type: String }],
  performanceChart: [{ type: Number }],
  bio: { type: String, default: "" },
  rank: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Trader || mongoose.model("Trader", TraderSchema);
