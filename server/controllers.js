const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: 'streakly'
});

module.exports = {
  getHabits: (req, res) => {
    const { user_id } = req.params;

    const query = 'SELECT * FROM streakly.habits WHERE user_id = $1';

    pool.query(query, [user_id], (err, result) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('result: ', result.rows);
      res.status(200).json(result.rows);
    });
  },

  postHabits: (req, res) => {
    const { user_id, name } = req.body;

    if (!user_id || !name) {
      return res.status(400).json({ error: 'user_id and name are required' });
    }

    const query =
      'INSERT INTO streakly.habits (user_id, name) VALUES ($1, $2) RETURNING *';

    pool.query(query, [user_id, name], (err, result) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json(result.rows[0]);
    });
  }
};