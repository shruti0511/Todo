import cron from 'node-cron'
import Todo from '../models/todo.model';

const setStatusCompleteJob = cron.schedule('0 0 * * *', async () => {
    try {

        const todos = await Todo.find({ completed: false, dueDate: { $lt: new Date() } });
        for (const todo of todos) {
            await Todo.findByIdAndUpdate(todo._id, { completed: true });
        }
    } catch (error) {
        console.error('Error during  job:', error);
    }
});


export default setStatusCompleteJob;