import mongoose from "mongoose";

export interface IPlaylist{
    songs: {
        title: string,
        artist: string,
        section: number,
        folderId: string
    }[],
    userAge?: number | undefined,
    codecA: string,
    codecB: string
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
        },
        folderId: {
            type: String,
            required: true
        }
    }],
    userAge: {
        type: Number
    },
    codecA: {
        type: String,
        required: true
    },
    codecB: {
        type: String,
        required: true
    }
});

export default mongoose.model("Playlist", Playlist);