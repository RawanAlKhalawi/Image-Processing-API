import resizeImage from './api/resizeImage';
import express from 'express';

const routes = express.Router();

routes.use('/resize-image', resizeImage);

export default routes;