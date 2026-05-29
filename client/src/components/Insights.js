import React from 'react';
import styled from 'styled-components';
import { Flame, Trophy, TrendingUp, Percent, CalendarDays, BarChart3 } from "lucide-react";

const Dashboard = styled.div`
    font-family: system-ui, sans-serif;
    max-width: 600px;
    margin: 0 auto;
`;

const Header = styled.h2`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 900;
`;

const Section = styled.div`
    margin: 16px 0;
    border-top: 1.5px solid #BEBEC2;
`;

const Title = styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    margin-bottom: 8px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Value = styled.div`
    font-weight: 500;
`;

const List = styled.ul`
    padding-left: 18px;
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
            <Header>
                <BarChart3 size={20} /> Insights
            </Header>
            <Section>
                <Title><Flame size={20} /> Current longest streak</Title>
                <Row>
                    <Label>Total</Label>
                    <Value>{longestStreak}</Value>
                </Row>
            </Section>
            <Section>
                <Title><TrendingUp size={20} /> Average streak:</Title>
                <Row>
                    <Label>Across habits</Label>
                    <Value>{averageStreak} days</Value>
                </Row>
            </Section>
            <Section>
                <Title><Trophy size={20} /> Habits with longest streak:{" "}</Title>
                <List>
                {longestStreakHabits.map(h => <li>{h.name}</li>)}
                </List>
            </Section>
            <Section>
                <Title><Percent size={20} /> Completion Rates:</Title>
                
                {completionRates.map(item => (
                    <div key={item.name}>
                        <Row>
                            <Label>{item.name}</Label>
                            <Value>{item.percentage}%</Value>
                        </Row>
                        
                        <Row>
                            <Label>
                                <CalendarDays size={20} />
                                {item.completedDates} / {item.totalDateSpan} days
                            </Label>
                        </Row>
                    </div>
                ))}
            </Section>
        </Dashboard>
    );
}