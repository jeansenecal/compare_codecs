import express, { Router } from "express";
import { postLogin, postSignup, logout } from "../controllers/auth";
import { ensureAuth, ensureGuest } from "../middleware/auth";

const router: Router = express.Router();
import { getGlobalResults, getResultsByUserId, getCodecList, postCreatePlaylist } from "../controllers/home";

router.get('/globalresults', getGlobalResults);
router.get('/userresults', getResultsByUserId);
router.get('/codecs', getCodecList);
router.post('/login', postLogin);
router.post('/signup', postSignup);
router.get('/logout', logout);

export default router;