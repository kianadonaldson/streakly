const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors');
const Controller = require('./controllers');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/habits/:user_id', Controller.getHabits);

app.post('/api/habits', Controller.postHabits);

app.post('/api/habits/:habit_id/complete', Controller.completeHabit);

app.delete('/api/habits/:habit_id', Controller.deleteHabit);

app.listen(port, () => {
    console.log(`We be listening on port ${port}`);
});