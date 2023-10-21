import express from 'express';
import mongoose from 'mongoose';

import analyzeJavaCode from '../analyzer/analyzeJavaCode.js';

const router = express.Router();

router.route('/').post((req,res)=>{
    const javaCode = req.body.code;

    res.send(analyzeJavaCode(javaCode));
});





export default router;