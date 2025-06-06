import mongoose from 'mongoose'
export const connectDb = async (mongoURL: string) => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}