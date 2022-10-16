// deno-lint-ignore no-explicit-any
export type AnyRecord = Record<string | number, any>;

type Matcher<Match> = Partial<{[K in keyof Match]: (a0: Match[K]) => boolean}>;

export const matches = <R extends AnyRecord>(r1: R) =>
	(r2: Matcher<R>) =>
		Object.keys(r2)
			.map((k) => r2[k]!(r1[k]))
			.reduce((b1, b2) => b1 && b2);

export type MatchSet<Match extends AnyRecord, Return> = [
	Matcher<Match>,
	() => Return
][];

export const matchWith = <Match extends AnyRecord>(obj: Match) => <Return>(
	set: MatchSet<Match, Return>,
) => {
	for (const m of set) {
		if (matches(obj)(m[0])) return m[1]();
	}
	throw new Error(
		`Attempted to match ${obj} against ${set} but no matches were found`,
	);
};
