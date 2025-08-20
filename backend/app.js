// index.js
import express from 'express';
import cors from 'cors';
//import accountRoutes from './routes/accountRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

//app.use('/auth/account', accountRoutes);

export default app;
