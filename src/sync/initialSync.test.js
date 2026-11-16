import { planInitialSync, diffSessions, sortSessions } from "./initialSync";

describe("planInitialSync", () => {
  test("new account + guest data: upload everything", () => {
    expect(planInitialSync({ owner: null, uid: "a", cloudExists: false })).toEqual({
      resetLocal: false, uploadSquad: true, uploadLocalSessions: true,
    });
  });
  test("new account + another user's data: start clean", () => {
    expect(planInitialSync({ owner: "b", uid: "a", cloudExists: false })).toEqual({
      resetLocal: true, uploadSquad: true, uploadLocalSessions: false,
    });
  });
  test("existing account + guest data: cloud squad wins, guest games are kept", () => {
    expect(planInitialSync({ owner: null, uid: "a", cloudExists: true })).toEqual({
      resetLocal: false, uploadSquad: false, uploadLocalSessions: true,
    });
  });
  test("existing account + same user: cloud wins, nothing re-uploaded", () => {
    expect(planInitialSync({ owner: "a", uid: "a", cloudExists: true })).toEqual({
      resetLocal: false, uploadSquad: false, uploadLocalSessions: false,
    });
  });
  test("existing account + another user's data: never mixed in", () => {
    expect(planInitialSync({ owner: "b", uid: "a", cloudExists: true })).toEqual({
      resetLocal: true, uploadSquad: false, uploadLocalSessions: false,
    });
  });
});

test("diffSessions finds new and deleted sessions", () => {
  const { added, removed } = diffSessions([{ id: "s2" }, { id: "s3" }], new Set(["s1", "s2"]));
  expect(added).toEqual([{ id: "s3" }]);
  expect(removed).toEqual(["s1"]);
});

test("sortSessions puts newest first", () => {
  const out = sortSessions([
    { id: "a", timestamp: "2026-01-01T00:00:00.000Z" },
    { id: "b", timestamp: "2026-03-01T00:00:00.000Z" },
  ]);
  expect(out.map((s) => s.id)).toEqual(["b", "a"]);
});
