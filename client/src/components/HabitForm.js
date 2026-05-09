import React, { useState } from 'react';

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
      <button type="submit">Add</button>
    </form>
  );
}