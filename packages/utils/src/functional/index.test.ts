import { expect, test } from 'vitest'
import { Pipe } from '.';

test("pipe", () => {
    const add = (a: number, b: number) => a + b;
    const double = (a: number) => a * 2;
    const addAndDouble = Pipe(add, double, double);
    expect(addAndDouble(1, 2)).toBe(12);
})