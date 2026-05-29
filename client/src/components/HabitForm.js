import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 1px 10px 3px 10px;
  border-radius: 50px;
  font-family: system-ui, sans-serif;
  font-size: 25px;

  &:hover {
    background: #ffffff;
  }
`;

const HabitInput = styled.input`
  font-family: system-ui, sans-serif;
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
    <Form onSubmit={handleSubmit}>
      <HabitInput
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter new habit"
      />
      <Button type="submit">+</Button>
    </Form>
  );
}