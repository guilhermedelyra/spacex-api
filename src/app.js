import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(morgan('dev'));
    this.express.use(express.json({ limit: 20 * 1024 * 1024 }));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use((error, req, res, next) => {
      console.err(error);
      next(res.sendStatus(500));
    });
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
