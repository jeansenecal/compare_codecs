import express, { Router } from "express";
import { postLogin, postSignup, logout } from "../controllers/auth";
import { ensureAuth, ensureGuest } from "../middleware/auth";
import  * as home  from "../controllers/home";

const router: Router = express.Router();

router.get('/globalresults', home.getGlobalResults);
router.get('/userresults', home.getResultsByUserId);
router.get('/codecs', home.getCodecList);
router.post('/login', postLogin);
router.post('/signup', postSignup);
router.get('/logout', logout);
router.post('/playlist', home.postCreatePlaylist);
router.get('/playlist/:id/nextsong', home.getNextSongInPlaylist);
router.delete('/playlist/:id/deletefirstsong', home.deleteFirstSongInPlaylist);
router.post('/playlist/:id/testresult', home.postTestResultForPlaylist);
router.get('/playlist/:id/testresult', home.getResultsForPlaylist);

export default router;