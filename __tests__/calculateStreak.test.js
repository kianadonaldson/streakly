const { calculateStreak } = require('../server/controllers');

describe('calculateStreak', () => {
    test('returns 0 when there are no completion dates', () => {
        expect(calculateStreak([])).toBe(0);
    });

    test('returns 1 when completed today', () => {
        const today = new Date();

        expect(
            calculateStreak([
                { completed_date: today }
            ])
        ).toBe(1);
    });

    test('returns 1 when only yesterday is completed', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        expect(
            calculateStreak([
                { completed_date: yesterday }
            ])
        ).toBe(1);
    });

    test('returns 2 for today and yesterday', () => {
        const today = new Date();

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        expect(
            calculateStreak([
                { completed_date: today },
                { completed_date: yesterday }
            ])
        ).toBe(2);
    });

    test('breaks streak after a missed day', () => {
        const today = new Date();

        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        expect(
            calculateStreak([
                { completed_date: today },
                { completed_date: twoDaysAgo }
            ])
        ).toBe(1);
    });

    test('does not count duplicate dates', () => {
        const today = new Date();

        expect(
            calculateStreak([
                { completed_date: today },
                { completed_date: today }
            ])
        ).toBe(1);
    });
});