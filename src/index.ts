import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDb } from './db/connectDB'
import routes from './routes/routes'
import { errorHandler } from './middleware/errorHandler'
import setStatusCompleteJob from './cron/todoCompleteJob'
dotenv.config();

const PORT = process.env.PORT || 3000;

interface UserInfo {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserInfo | null;
        }
    }
}
const app = express();
app.use(express.json());
app.use(cors())
setStatusCompleteJob.start()

app.use('/api', routes)
app.use(errorHandler)

const start = async () => {
    await connectDb(process.env.MONGO_URI || 'mongodb://localhost:27017/Todo')

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start()





