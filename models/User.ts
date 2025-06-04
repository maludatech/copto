import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  followedTraders: [
    {
      traderId: { type: mongoose.Schema.Types.ObjectId, ref: "Trader" },
      followedAt: { type: Date, default: Date.now },
    },
  ],
  copiedTraders: [
    {
      traderId: { type: mongoose.Schema.Types.ObjectId, ref: "Trader" },
      copyAmount: { type: Number, required: true },
      settings: {
        copyAllTrades: { type: Boolean, default: true },
        proportionalCopying: { type: Boolean, default: true },
        stopLossProtection: { type: Boolean, default: true },
      },
      startedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
