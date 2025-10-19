import mongoose from "../config/database.js";

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Loan", loanSchema);
