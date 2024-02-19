import mongoose from "mongoose";

export interface IPlaylist{
    songs: {
        title: string,
        artist: string,
        section: number
    }[],
    headphones: string,
    dac: string,
    amp: string
}

export interface PlaylistDocument extends IPlaylist, Document{}

const Playlist = new mongoose.Schema({
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
    }],
    headphones: {
        type: String,
        required: true
    },
    dac: {
        type: String,
        required: true
    },
    amp: {
        type: String,
        required: true
    }
});

export default mongoose.model("Playlist", Playlist);