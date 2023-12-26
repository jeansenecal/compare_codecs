import { Request, Response } from 'express';
import TestResult from '../models/TestResult';

module.exports = {
    getGlobalResults: async (req: Request, res: Response) => {
        let allResults = await TestResult.find();
        res.send(allResults);
    },
    getResultsByUserId: async (req: Request, res: Response) => {
        let results = await TestResult.find({ userId: req.params.userId });
        res.send(results);
    }
}