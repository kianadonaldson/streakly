import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  border-radius: 10px;
  font-family: system-ui, sans-serif;
  background: #4863F7;
  color: white;

  &:hover {
    background: #D9DFFF;
    color: #4863F7;
  }
`;

const HabitCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const HabitTitle = styled.p`
  font-weight: 500;
`;

const Streak = styled.p`
  font-weight: 200;
`;

export default function HabitItem({ habit, onComplete }) {

    return (
        <HabitCard>
            <HabitTitle>
              {habit.name}
            </HabitTitle>
            <Button
                onClick={() => onComplete(habit.id)}
            >
                Complete Today
            </Button>
            <Streak>Streak: {habit.streak}</Streak>
        </HabitCard>
    );
}