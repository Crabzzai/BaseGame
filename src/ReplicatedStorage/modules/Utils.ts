import Abbreviator from "@rbxts/abbreviate";

const SI_SYMBOL = {
	NORMAL: [
		"k",
		"m",
		"b",
		"t",
		"qa",
		"qi",
		"sx",
		"sp",
		"oc",
		"no",
		"dc",
		"ud",
		"dd",
		"td",
		"qad",
		"qid",
		"sxd",
		"spd",
		"ocd",
		"nod",
		"vg",
		"uvg",
	],
};

const abbreviator = new Abbreviator();
abbreviator.setSetting("suffixTable", SI_SYMBOL.NORMAL);
abbreviator.setSetting("stripTrailingZeroes", true);

export const Abbreviate = (n: number) => {
	return abbreviator.numberToString(n);
};
