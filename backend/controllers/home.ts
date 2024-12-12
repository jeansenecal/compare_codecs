import { Request, Response } from 'express';
import Playlist, { IPlaylist } from '../models/Playlist';
import TestResult, { ITestResult, TestResultDocument } from '../models/TestResult';
import { SongIndex, SongInformation } from '../config/SongIndex';
import dotenv from "dotenv";
import { Codecs } from '../config/enumCodecs';
import User, { IUser, UserDocument } from '../models/User';
import test from 'node:test';

dotenv.config({ path: "./config/.env" });

interface Song {
    title: String;
    artist: String;
    section: Number;
    folderId: String
}

export const getGlobalResults = async (req: Request, res: Response) => {
    let allResults = await TestResult.find().populate('user');
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
    let userAge = req.body.userAge;
    let codecA = req.body.codecA;
    let codecB = req.body.codecB;
    let songInfoArray: SongInformation[] = SongIndex;
    let playlistLength = 15;
    shuffle(songInfoArray);
    songInfoArray = songInfoArray.slice(0, playlistLength);
    let songs: Song[] = songInfoArray.map(song => {
        return {
            title: song.songName,
            artist: song.artistName,
            section: Math.floor(Math.random() * (3)) + 1,
            folderId: song.folderId
        }
    });
    try{
        let playlist = new Playlist({ songs: songs, userAge: userAge, codecA: codecA, codecB: codecB });
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
            let playlist: IPlaylist = await Playlist.findById(playlistId).lean().orFail();

            if(playlist.songs.length === 0){
                return res.status(400).send({ msg: "Playlist is empty" });
            }

            const song: Song = playlist.songs[0];
            const codecA: String = playlist.codecA;
            const codecB: String = playlist.codecB;
            
            const codecAUrl: String = createSongUrl(song, codecA);
            const codecBUrl: String = createSongUrl(song, codecB);
           
            return res.status(200).send({ ...playlist.songs[0],  codecAUrl: codecAUrl, codecBUrl: codecBUrl });
        } catch (err){
            console.log(err);
            return res.status(404).send({ msg: "Could not find playlist" });
        }
    } else {
        return res.status(400).send({ msg: "Playlist Id is missing" }); 
    }
}

export const deleteFirstSongInPlaylist = async (req: Request, res: Response) => {
    if(req.params.id !== ''){
        const playlistId: String = req.params.id;
        try{
            let playlist: IPlaylist = await Playlist.findById(playlistId).orFail();
            playlist.songs.shift();
            console.log(playlist)
            if (playlist.songs.length >= 1) {
                await Playlist.updateOne( { _id: playlistId }, playlist);
                return res.status(200).send({ msg: "song deleted" });
            } else {
                await Playlist.deleteOne({ _id: playlistId });
                return res.status(200).send({ msg: "playlist deleted" });
            }
        } catch (err){
            console.log(err);
            return res.status(404).send({ msg: "Could not find playlist" });
        }
    } else {
        return res.status(400).send({ msg: "Playlist Id is missing" }); 
    }
}

export const postTestResultForPlaylist = async (req: Request, res: Response) => {
    if(req.params.id !== ''){
        const playlistId: string = req.params.id;
        const correctAnswer: Boolean = req.body.correctAnswer;
        const userId: string = req.body.userId;
        let user: UserDocument;
        try {
            user = await User.findById(userId).lean().orFail();
        } catch (err) {
            return res.status(404).send({ msg: "Could not find user" });
        }
        let playlist: IPlaylist;
        try {
            console.log(`playlist = ${playlistId}`)
            playlist = await Playlist.findById(playlistId).lean().orFail();
        } catch (err) {
            return res.status(404).send({ msg: "Could not find playlist" });
        }
        const userAge: number | undefined = playlist.userAge;
        const codecA: string = playlist.codecA;
        const codecB: string = playlist.codecB;
        const song: string = playlist.songs[0].title;
        const testResult = new TestResult({
            codecA: codecA,
            codecB: codecB,
            song: song,
            correctAnswer: correctAnswer,
            user: user._id,
            userAge: userAge,
            playlistId: playlistId,
            date: new Date()
        });
        try {
            await testResult.save();
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
        
    }
}

export const getResultsForPlaylist = async (req: Request, res: Response) => {
    if(req.params.id !== ''){
        const playlistId: string = req.params.id;

        let results: ITestResult[] = await TestResult.find({ playlistId: playlistId }).lean();
        if(!results || results.length === 0){
            return res.status(404).send();
        }
        return res.status(200).send({ result: results });
    }
}

export const deletePlaylist = async (req: Request, res: Response) => {
    if(req.params.id !== ''){
        const playlistId: String = req.params.id;
        try {
            await Playlist.deleteOne({ _id: playlistId });
            return res.status(200);
        } catch (error) {
            return res.status(400);
        }
    }
    return res.status(400);
}

function shuffle(array: SongInformation[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

function createSongUrl<String> (song: Song, codec: String){
    const cloudinaryBaseUrl = process.env.CLOUDINARY_BASE_URL;
    return cloudinaryBaseUrl + '/' + song.folderId + '/' + song.title + '/' + song.title.split(' ').join('_').toLowerCase() + '_' + codec + '_part' + song.section + '.flac'
}