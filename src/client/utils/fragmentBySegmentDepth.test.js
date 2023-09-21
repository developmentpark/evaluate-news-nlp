import { testCasesForFragmentBySegmentDepth as testCases } from "./test-data";
import { fragmentBySegmentDepth } from "./fragmentBySegmentDepth";

describe("Test for FragmentBySegmentDepth", () => {
  testCases.forEach((testCase, idx) => {
    test(`Test ${idx}`, () => {
      const result = fragmentBySegmentDepth(testCase.input);
      expect(result).toStrictEqual(testCase.expected);
    });
  });
});
