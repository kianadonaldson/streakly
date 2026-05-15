import React, { useState } from 'react';

export default function HabitItem({ habit, onComplete }) {

    return (
        <div>
            <>{habit.name}</>
            <button
                onClick={() => onComplete(habit.id)}
            >
                Complete Today
            </button>
            <>Streak: {habit.streak}</>
        </div>
    );
}