import { describe, expect, test } from "vitest";
import { divideTestCases, multiplyTestCases } from "#math/__fixtures__/test-cases";
import { divide, multiply } from "#math/advanced";

describe("should multiply two numbers", () => {
  test.each(multiplyTestCases)("$a x $b = $expected", ({ a, b, expected }) => {
    // act
    const result = multiply(a, b);
    // assert
    expect(result).toStrictEqual(expected);
  });
});

describe("should divide two numbers", () => {
  test.each(divideTestCases)("$a / $b = $display", ({ a, b, expected }) => {
    // act
    const result = divide(a, b);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
