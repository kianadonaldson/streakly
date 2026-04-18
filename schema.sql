DROP SCHEMA IF EXISTS streakly CASCADE;
CREATE SCHEMA streakly;

SET search_path TO streakly;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL CHECK (email = LOWER(email))
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habit_logs (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  completed_date DATE NOT NULL,
  UNIQUE (habit_id, completed_date)
);

CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_logs_habit_id ON habit_logs(habit_id);