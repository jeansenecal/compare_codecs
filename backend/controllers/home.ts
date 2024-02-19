import { Request, Response } from 'express';
import TestResult from '../models/TestResult';
import Playlist, { IPlaylist, PlaylistDocument } from '../models/Playlist';
import { SongIndex, SongInformation } from '../config/SongIndex';
import dotenv from "dotenv";
import { Codecs } from '../config/enumCodecs';
import User from '../models/User';

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
    let results = await TestResult.find({ userId: req.body.userId });
    res.send(results);
}

export const getCodecList = async (req: Request, res: Response) => {
    res.send(Codecs);
}

export const postCreatePlaylist = async (req: Request, res: Response) => {
    let headphones = req.body.headphones;
    let amp = req.body.amp;
    let dac = req.body.dac;
    let songInfoArray: SongInformation[] = SongIndex;
    let playlistLength = 15;
    shuffle(songInfoArray);
    songInfoArray = songInfoArray.slice(0, playlistLength);
    let songs: Song[] = songInfoArray.map(song => {
        return {
            title: song.songName,
            artist: song.artistName,
            section: Math.floor(Math.random() * (3)) + 1
        }
    });
    try{
        let playlist = new Playlist({ songs: songs, headphones: headphones, dac: dac, amp: amp });
        await playlist.save();
        res.status(201).send({ playlistId: playlist.id });

    } catch (err){
        console.log(err);
        res.status(500).send({ err: err });
        return; 
    }
}

export const getNextSongInPlaylist = async (req: Request, res: Response) => {
    if(req.params.id !== ''){
        const playlistId: String = req.params.id;
        try{
            let playlist: IPlaylist = await Playlist.findOne({ id: playlistId }).lean().orFail();

            if(playlist.songs.length === 0){
                return res.status(404).send({ msg: "Playlist is empty" });
            }
            
            return res.status(200).send({ playlist: playlist.songs[0] });
        } catch (err){
            console.log(err);
            return res.status(404).send({ msg: "Could not find playlist" });
        }
    } else {
        return res.status(400).send({ msg: "Playlist Id is missing" }); 
    }
}

export const getSetupsByUserId = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    let user = await User.findOne({ id: userId }).lean();
    if(user) {
        let setups = user.setups;
        if(!setups || setups.length === 0) {
            res.status(200).send([{
                headphone: "Sunny HD Six Hundo",
                dac: "Atom DAC",
                amp: "Atom Amp",
            }]);
        }else{
            res.status(200).send(setups);
        }
    }else {
        res.status(400).send("user not found");
    }
}

function shuffle(array: SongInformation[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }