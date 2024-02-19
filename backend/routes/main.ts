import express, { Router } from "express";
import { postLogin, postSignup, logout } from "../controllers/auth";
import { ensureAuth, ensureGuest } from "../middleware/auth";
import  * as home  from "../controllers/home";

const router: Router = express.Router();

router.get('/globalresults', home.getGlobalResults);
router.get('/userresults', home.getResultsByUserId);
router.get('/codecs', home.getCodecList);
router.get('/setups', ensureAuth, home.getSetupsByUserId);
router.post('/login', postLogin);
router.post('/signup', postSignup);
router.get('/logout', logout);
router.post('/playlist', home.postCreatePlaylist);
router.get('/playlist/:id/nextsong', home.getNextSongInPlaylist);

export default router;