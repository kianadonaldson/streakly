import React, { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm.js';
import HabitList from './components/HabitList.js';

export default function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = () => {
    fetch('api/habits/1')
    .then(res => res.json())
    .then(setHabits);
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (name) => {
    await fetch('api/habits', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ user_id: 1, name })
    });
    fetchHabits();
  }

  return (
    <div>
      <h1>Streakly Habit Tracker</h1>
      <HabitForm onAdd={addHabit} />
      <HabitList habits={habits} />
    </div>
  )
}