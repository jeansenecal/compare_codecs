import express, { Router } from "express";

const router: Router = express.Router();
const homeController = require('../controllers/home');

router.get('/globalresults', homeController.getGlobalResults);

export default router;