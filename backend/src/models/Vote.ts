import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  pollId: mongoose.Schema.Types.ObjectId,
  studentId: String, // socketId or generated UUID
  optionIndex: Number
});

export default mongoose.model("Vote", VoteSchema);
