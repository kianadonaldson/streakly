import React from 'react';
import { Link } from 'react-router-dom';
import HabitItem from './HabitItem.js';

export default function HabitList({ habits, onComplete }) {
    return (
        <div>
            {habits.map(h => (
                <HabitItem
                key={h.id}
                habit={h}
                onComplete={onComplete}
                />
            ))}
            <Link to="/insights">
                View insights
            </Link>
        </div>
    )
}