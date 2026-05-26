import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HabitForm from './components/HabitForm.js';
import HabitList from './components/HabitList.js';
import Insights from './components/Insights.js'
import styled from 'styled-components';

const Page = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

export default function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = () => {
    fetch('/api/habits/1')
    .then(res => res.json())
    .then(setHabits);
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (name) => {
    await fetch('/api/habits', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ user_id: 1, name })
    });
    fetchHabits();
  }

  const completeHabit = async (habitId) => {
    await fetch(
      `/api/habits/${habitId}/complete`,
      {
        method: 'POST'
      }
    );

    fetchHabits();
  }

  return (
    <Page>
      <Title>Streakly Habit Tracker</Title>
      <Routes>
        <Route exact path="/" element={
          <>
            <HabitForm onAdd={addHabit} />
            <HabitList
              habits={habits}
              onComplete={completeHabit} />
          </>
        } />
        <Route path="/insights" element={
          <Insights habits={habits} />
        } />
    </Routes>
    </Page>
  )
}