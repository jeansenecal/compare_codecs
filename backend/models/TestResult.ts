import mongoose from "mongoose";

export interface ITestResult {
    codecA: string,
    codecB: string,
    song: string,
    playlistId: string,
    userAge: number;
    correctAnswer: boolean,
    user: number,
    date: Date
}

export interface TestResultDocument extends ITestResult, Document{}

const TestResult = new mongoose.Schema({
    codecA: {
        type: String,
        required: true
    },
    codecB: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    playlistId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userAge: {
        type: Number
    },
    correctAnswer: {
        type: Boolean,
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