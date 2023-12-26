import mongoose from "mongoose";

const TestResult = new mongoose.Schema({
    codecA: {
        type: String,
        required: true
    },
    codecB: {
        type: String,
        required: true
    },
    hardware: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        required: true
    }
});

export default mongoose.model("TestResult", TestResult);