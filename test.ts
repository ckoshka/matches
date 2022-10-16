import { matchWith } from "./mod.ts";

const resp = {
	code: 404,
	data: "hello",
};

const is = <T>(a: T) => (a1: unknown) => a1 === a; 

const j = matchWith(resp)([
	[{ code: is(404) }, () => "uh oh, we got a 404"],
	[{ code: c => c > 1000 }, () => "huh????"],
	[{ data: is("goodbye") }, () => "ominous response from server, please check"],
]);

j === "uh oh, we got a 404"
