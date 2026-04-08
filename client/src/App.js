import React, { useEffect, useState } from 'react';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Streakly</h1>

      <form>
        <input
          type="text"
          placeholder="Enter new habit"
          value={null}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Add Habit</button>
      </form>
    </div>
  );
}