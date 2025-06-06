import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDb } from './db/connectDB'
import routes from './routes/routes'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api', routes)

const start = async () => {
    await connectDb(process.env.MONGO_URI || 'mongodb://localhost:27017/Todo')

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start()





