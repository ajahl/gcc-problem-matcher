import { matchResults } from "../__helpers__/utils";
import { problemMatcher as problemMatcherJson } from "../.github/problem-matcher.json";
import { ProblemMatcher, ProblemPattern } from "github-actions-problem-matcher-typings";

const problemMatcher: ProblemMatcher = problemMatcherJson[0];

describe("problemMatcher", () => {
  it("has the correct owner", () => {
    expect(problemMatcher.owner).toEqual("gcc-problem-matcher");
  });

  it("has one pattern", () => {
    expect(problemMatcher.pattern.length).toEqual(1);
  });

  describe("finding pattern", () => {
    const reportOutput = [
      "/magma/lte/gateway/c/oai/common/log.h:364:1: warning: type qualifiers ignored on function return type [-Wignored-qualifiers]",
      "/magma/lte/gateway/c/oai/lib/3gpp/3gpp_24.008_common_ies.c:1031:61: warning: unused parameter 'len' [-Wunused-parameter]",
    ];

    let pattern: ProblemPattern;
    let results: RegExpExecArray[];

    beforeEach(() => {
      pattern = problemMatcher.pattern[0];

      const regexp = new RegExp(pattern.regexp);

      results = matchResults(reportOutput, regexp);
    });

    it("matches violations", () => {
      expect(results.length).toEqual(2);
    });

    it("matches gcc warnings without parameter note", () => {
      expect(results[0][pattern.file]).toEqual("/magma/lte/gateway/c/oai/common/log.h");
      expect(results[0][pattern.line]).toEqual("364");
      expect(results[0][pattern.column]).toEqual("1");
      expect(results[0][pattern.severity]).toEqual("warning");
      expect(results[0][pattern.message]).toEqual("type qualifiers ignored on function return type [-Wignored-qualifiers]");
    });

    it("matches gcc warnings with parameter note", () => {
      expect(results[1][pattern.file]).toEqual("/magma/lte/gateway/c/oai/lib/3gpp/3gpp_24.008_common_ies.c");
      expect(results[1][pattern.line]).toEqual("1031");
      expect(results[1][pattern.column]).toEqual("61");
      expect(results[1][pattern.severity]).toEqual("warning");
      expect(results[1][pattern.message]).toEqual("unused parameter 'len' [-Wunused-parameter]");
    });
  });
});
