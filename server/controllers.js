const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: 'streakly'
});

const calculateStreak = (dates) => {
  if (!dates.length) return 0;

  let streak = 0;
  let expectedDate = new Date();
  let firstDate = true;

  expectedDate.setHours(0, 0, 0, 0);

  const sortedDates = dates
  .map(d => new Date(d.completed_date))
  .sort((a, b) => b - a);

  for (const date of sortedDates) {
    date.setHours(0, 0, 0, 0);

    const diff =
      (expectedDate - date) /
      (1000 * 60 * 60 * 24);

    if (firstDate && (diff === 0 || diff === 1)) {
      streak++;
      firstDate = false;

      expectedDate = new Date(date);
      expectedDate.setDate(
        expectedDate.getDate() - 1
      );
    } else if (!firstDate && diff === 0) {
      streak++;

      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

module.exports = {
  calculateStreak,

  getHabits: (req, res) => {
    const { user_id } = req.params;

    const query = `
      SELECT
        h.id,
        h.name,
        h.created_at,
        hl.completed_date
      FROM streakly.habits h
      LEFT JOIN streakly.habit_logs hl
        ON h.id = hl.habit_id
      WHERE h.user_id = $1
      ORDER BY h.id, hl.completed_date DESC
    `

    pool.query(query, [user_id], (err, result) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({ error: 'Database error' });
      }

      const habits = {};

      result.rows.forEach(row => {
        if (!habits[row.id]) {
          habits[row.id] = {
            id: row.id,
            name: row.name,
            created_at: row.created_at,
            logs: []
          };
        }

        if (row.completed_date) {
          habits[row.id].logs.push({
            completed_date:
              row.completed_date
          });
        }
      });

      const addStreak =
        Object.values(habits).map(habit => ({
          ...habit,
          streak: calculateStreak(
            habit.logs
          )
        }));

      res.status(200).json(addStreak);
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
  },

  completeHabit: (req, res) => {
    const { habit_id } = req.params;

    const query = `
      INSERT INTO streakly.habit_logs
      (habit_id, completed_date)
      VALUES ($1, CURRENT_DATE)
      ON CONFLICT (habit_id, completed_date)
      DO NOTHING
      RETURNING *
    `;

    pool.query(query, [habit_id], (err, result) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({
          error: 'Database error'
        })
      }

      res.status(201).json(result.rows[0]);
    });
  },

  deleteHabit: (req, res) => {
    const { habit_id } = req.params;

    const query = `
      DELETE FROM streakly.habits
      WHERE id = $1
      RETURNING *
    `;

    pool.query(query, [habit_id], (err, result) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({
          error: 'Database error'
        })
      }

      res.status(200).json(result.rows[0]);
    })
  },

  updateHabit: (req, res) => {
    const { habit_id} = req.params;
    const { name } = req.body;

    const query = `
      UPDATE streakly.habits
      SET name = $2
      WHERE id = $1
      RETURNING *
    `;

    pool.query(query, [habit_id, name], (err, result) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({
          error: 'Database error'
        })
      }

      res.status(200).json(result.rows[0]);
    })
  }
};