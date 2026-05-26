import React from 'react';
import styled from 'styled-components';

const Dashboard = styled.div`
    text-align: center;
`;

export default function Insights({ habits }) {
    const longestStreak = Math.max(...habits.map(h => (
        h.streak
    )));

    const longestStreakHabits = habits.filter(h => (
        h.streak === longestStreak && h.streak !== 0
    ));

    const currentStreaks = habits.filter(
        h => h.streak > 0
    );

    const totalStreak = currentStreaks.reduce((sum, habit) => {
        return sum + habit.streak
    }, 0);

    const averageStreak =
        currentStreaks.length > 0 && longestStreak !== 0
            ? (totalStreak / currentStreaks.length).toFixed()
            : 0;

    const getHabitLogs = (habits) => {
        return habits.map(habit => ({
            name: habit.name,
            dates: habit.logs.map(
                log => new Date(log.completed_date)
            )
        }));
    };

    const calculateCompletionRate = () => {
        const habitLogs = getHabitLogs(habits);

        if (!habitLogs.length) return [];

        const results = [];

        return habitLogs.map(log => {
            
            const sortedDates = [...log.dates].sort((a, b) => a - b);

            const firstDate = new Date(sortedDates[0]);
            const currentDate = new Date();

            firstDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);

            const totalDateSpan = Math.floor(
                (currentDate - firstDate) /
                (1000 * 60 * 60 * 24)) + 1;
            
            const completedDates = sortedDates.length;
            
            const percentage = 
                totalDateSpan > 0
                    ? (completedDates / totalDateSpan) * 100
                    : 0;

            return {
                name: log.name,
                completedDates,
                totalDateSpan,
                percentage: percentage.toFixed()
            };
        })
    };

    const completionRates = calculateCompletionRate();

    return (
        <Dashboard>
            <h2>Insights</h2>
            <p>Current longest streak: {longestStreak}</p>
            <p>
                Habits with longest streak:{" "}
                {longestStreakHabits.map(h => (h.name)).join(", ")}
            </p>
            <p>Average streak: {averageStreak} days</p>
            <div key="rates">
                <p>Completion Rates:</p>
                {completionRates.map(item => (
                    <>
                        <p>{item.name}:</p>
                        <p>{item.completedDates} / {item.totalDateSpan} days
                        = {item.percentage}%</p>
                    </>
                ))}
            </div>
        </Dashboard>
    );
}