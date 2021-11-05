import express from 'express';
import { salesForceRouter } from './salesforce.routes';

const router = express.Router();

export const routes = [
	router.use('/salesforce', salesForceRouter),
];