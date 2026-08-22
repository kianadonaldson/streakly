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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

export default function HabitItem({ habit, onComplete, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(habit.name);

  return (
    <HabitCard>
      {editing ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            onClick={() => {
              onUpdate(habit.id, name);
              setEditing(false);
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <HabitTitle>{habit.name}</HabitTitle>

          <Button onClick={() => setEditing(true)}>
            Edit
          </Button>

          <Button onClick={() => onComplete(habit.id)}>
            Complete Today
          </Button>

          <Streak>Streak: {habit.streak}</Streak>

          <Button onClick={() => onDelete(habit.id)}>
            <X size={20} />
          </Button>
        </>
      )}
    </HabitCard>
  );
}