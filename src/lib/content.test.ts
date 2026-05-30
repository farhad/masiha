import { describe, expect, it } from "vitest";
import {
  allBibleRows,
  bibleYearPlan,
  journeys,
  studyThemes,
} from "./content";

describe("content seed data", () => {
  it("given Bible rows when searching for John 3 then returns the expected passage", () => {
    const results = allBibleRows.filter((row) =>
      row.reference.toLowerCase().includes("john 3"),
    );

    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          reference: "John 3:16",
        }),
      ]),
    );
  });

  it("given first version themes when loaded then includes every requested theme", () => {
    const themeIds = studyThemes.map((theme) => theme.id);

    expect(themeIds).toEqual([
      "temptation",
      "anxiety",
      "depression",
      "love",
      "anger",
      "hope",
      "peace",
      "fear",
      "stress",
      "patience",
      "doubt",
      "joy",
      "jealousy",
      "loss",
      "healing",
    ]);
  });

  it("given learning journeys when loaded then separates seeker and growing paths", () => {
    expect(journeys.map((journey) => journey.id)).toEqual([
      "seeker",
      "growing",
    ]);
  });

  it("given Bible in one year when loaded then contains 365 days", () => {
    expect(bibleYearPlan).toHaveLength(365);
  });
});
