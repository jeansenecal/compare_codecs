import mongoose from "mongoose";

const SongResult = new mongoose.Schema({
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
    correctAnswer : {
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

export default mongoose.model("SongResult", SongResult);