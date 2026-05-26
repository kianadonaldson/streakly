import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  border-radius: 10px;

  &:hover {
    background: white;
  }
`;

export default function HabitForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter new habit"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}