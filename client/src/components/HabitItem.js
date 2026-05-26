import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  border-radius: 10px;

  &:hover {
    background: white;
  }
`;

export default function HabitItem({ habit, onComplete }) {

    return (
        <div>
            <>{habit.name}</>
            <Button
                onClick={() => onComplete(habit.id)}
            >
                Complete Today
            </Button>
            <>Streak: {habit.streak}</>
        </div>
    );
}