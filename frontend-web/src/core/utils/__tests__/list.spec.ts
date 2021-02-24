import { generateList } from "../list";

test('should genetate a list', () => {
    const amount = 5;
    const result = generateList(amount);
    const expected = [0, 1, 2, 3, 4];
    expect(result).toEqual(expected);
})