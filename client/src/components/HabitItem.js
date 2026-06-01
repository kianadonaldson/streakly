import React, { useState } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: start;
  gap: 15px;
`;

const HabitTitle = styled.p`
  font-weight: 500;
`;

const Streak = styled.p`
  font-weight: 200;
`;

export default function HabitItem({ habit, onComplete, onDelete }) {

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
            <Button
              onClick={() => onDelete(habit.id)}
            >
              <X size={20}></X>
            </Button>
        </HabitCard>
    );
}