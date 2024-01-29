import mongoose from "mongoose";

const Playlist = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    songs: [{
        title: {
        type: String,
        required: true
        },
        artist: {
            type: String,
            required: true
        },
        section: {
            type: Number,
            required: true
        }
    }]
});

export default mongoose.model("Playlist", Playlist);