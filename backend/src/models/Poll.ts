import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
    question: String,
    options: [{ text: String, votes: { type: Number, default: 0 } }],
    duration: Number, // seconds
    startTime: Date,
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "ENDED"],
        default: "ACTIVE"
    },

});


export default mongoose.model("Poll", PollSchema);
