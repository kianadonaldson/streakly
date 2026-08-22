import React from 'react';
import HabitItem from './HabitItem';

export default function HabitList({ habits, onComplete, onDelete, onUpdate }) {
    return (
        <div>
            {habits.map(h => (
                <HabitItem
                key={h.id}
                habit={h}
                onComplete={onComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}