import { Request, Response } from 'express';
import TestResult from '../models/TestResult';
import Playlist from '../models/Playlist';
import { SongIndex, SongInformation } from '../config/SongIndex';
import dotenv from "dotenv";
import { Codecs } from '../config/enumCodecs';

dotenv.config({ path: "./config/.env" });

interface Song {
    title: String;
    artist: String;
    section: Number;
}

export const getGlobalResults = async (req: Request, res: Response) => {
    let allResults = await TestResult.find();
    res.send(allResults);
}

export const getResultsByUserId = async (req: Request, res: Response) => {
    let results = await TestResult.find({ userId: req.params.userId });
    res.send(results);
}

export const getCodecList = async (req: Request, res: Response) => {
    res.send(Codecs);
}

export const postCreatePlaylist = async (req: Request, res: Response) => {
    let sessionId: Number = req.body.sessionId;
    let songInfoArray: SongInformation[] = SongIndex;
    let playlistLength = 15;
    shuffle(songInfoArray);
    songInfoArray = songInfoArray.slice(playlistLength);
    let songs: Song[] = songInfoArray.map(song => {
        return {
            title: song.songName,
            artist: song.artistName,
            section: Math.floor(Math.random() * (3)) + 1
        }
    });
    let playlist = new Playlist({ sessionId: sessionId, songs: songs });
    await playlist.save();
    res.send("created");
}


function shuffle(array: SongInformation[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }