const sum = require('./sum');

test('10 + 10 to be equal 20', () => {
    expect(sum(10, 10)).toBe(20);
});
