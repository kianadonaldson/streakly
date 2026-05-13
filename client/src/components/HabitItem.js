import React, { useState } from 'react';

export default function HabitItem({ habit }) {

    return (
        <div>
            {habit.name}
        </div>
    )
}