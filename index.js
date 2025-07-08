import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './config/db.js';
import routes from './routes/Main.js';
//import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

ConnectDB();

app.use('/api/v3/',routes);

app.get('/',(req,res) => {
    res.send("Hello word");
});

app.listen(port,() => {
    console.log('aplikasi berjalan pada port yang ditentukan');
});
