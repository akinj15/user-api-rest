import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
dotenv.config();
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/user', userRoutes);
  }
}

export default new App().app;
