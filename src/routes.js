import express from 'express';
import launchesRoutes from './routes/launchesRoutes';

const routes = new express.Router();

routes.use('/launches', launchesRoutes);

export default routes;
