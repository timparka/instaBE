import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
//import postRoute from './routes/postRoute';
//import uploadRoute from './routes/uploadRoute';
import logger from "./utils/logger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//app.use('/api/auth', authRoute);
//app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
//app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on on http://localhost:${PORT}`));
