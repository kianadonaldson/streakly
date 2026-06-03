import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import Insights from './components/Insights'
import styled from 'styled-components';

const Page = styled.div`
  padding: 20px;
  font-family: system-ui, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-family: Optima;
  font-weight: 800;
`;

const Nav = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 10px 16px;
  border-radius: 15px;
  background: #f3f4f6;
  font-weight: 600;
  font-family: system-ui, sans-serif;
  transition: 0.0s ease;

  &:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }
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
      });
    fetchHabits();
  }


  const deleteHabit = async (habitId) => {
    await fetch(`/api/habits/${habitId}`, {
      method: 'DELETE'
    });
    setHabits(prev =>
      prev.filter(habit => habit.id !== habitId)
    );
  }

  return (
    <Page>
      <Title>Streakly Habit Tracker</Title>

      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/insights">Insights</StyledLink>
      </Nav>

      <Routes>
        <Route exact path="/" element={
          <>
            <HabitForm onAdd={addHabit} />
            <HabitList
              habits={habits}
              onComplete={completeHabit}
              onDelete={deleteHabit} />
          </>
        } />
        <Route path="/insights" element={
          <Insights habits={habits} />
        } />
    </Routes>
    </Page>
  )
}