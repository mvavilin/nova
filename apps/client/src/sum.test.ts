import { test, expect } from 'vitest';
import { sum } from './sum';

test('sum adds numbers correctly', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, 1)).toBe(0);
});
