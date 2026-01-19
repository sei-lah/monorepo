import { err, ok, type Result } from "@mkvlrn/result";

interface TestCase<T> {
  a: number;
  b: number;
  expected: T;
  display?: string | number;
}

export const addTestCases: TestCase<number>[] = [
  { a: 2, b: 2, expected: 4 },
  { a: 2, b: 3, expected: 5 },
  { a: 1000, b: 2000, expected: 3000 },
];

export const subtractTestCases: TestCase<number>[] = [
  { a: 2, b: 2, expected: 0 },
  { a: 2, b: 3, expected: -1 },
  { a: 1000, b: 2000, expected: -1000 },
];

export const multiplyTestCases: TestCase<number>[] = [
  { a: 2, b: 2, expected: 4 },
  { a: 2, b: 3, expected: 6 },
  { a: 1000, b: 2000, expected: 2_000_000 },
];

export const divideTestCases: TestCase<Result<number, Error>>[] = [
  { a: 2, b: 2, expected: ok(1), display: 1 },
  { a: 2, b: 4, expected: ok(0.5), display: 0.5 },
  { a: 999, b: 333, expected: ok(3), display: 3 },
  {
    a: 2,
    b: 0,
    expected: err(new Error("cannot divide by zero")),
    display: "Error: cannot divide by zero",
  },
];
