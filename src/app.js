require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

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

module.exports = new App().express;
