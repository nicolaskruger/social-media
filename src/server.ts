import type {User} from '@dto/user';
import express from 'express';
import {errorMiddleware} from './middlewares/erroMiddleware';
import {router} from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());

// App.use(cors());

app.get('/', (req, res) => res.json({message: 'ok'}));

app.use(router);

app.use(errorMiddleware);

app.listen(3333);
