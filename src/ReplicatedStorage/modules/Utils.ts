const SI_SYMBOL = {
	NORMAL: [
		"",
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

export const Abbreviate = (n: number, uppercase: boolean, decimals?: number): string => {
	if (decimals === undefined) decimals = 0;
	let Visible = undefined;
	let Suffix = undefined;
	if (n < 1000) {
		Visible = n * math.pow(10, decimals);
		Suffix = "";
	} else {
		const Digits = math.floor(math.log10(n)) + 1;
		const _Index = math.min(SI_SYMBOL["NORMAL"].size(), math.floor((Digits - 1) / 3));
		Visible = n / math.pow(10, _Index * 3 - decimals);
		Suffix = SI_SYMBOL["NORMAL"][_Index];
	}
	const Front = Visible / math.pow(10, decimals);
	const Back = Visible % math.pow(10, decimals);

	if (decimals > 0) {
		return string.format(`%i.%0.${decimals}i%s`, Front, Back, uppercase ? string.upper(Suffix) : Suffix);
	} else {
		return string.format("%i%s", Front, uppercase ? string.upper(Suffix) : Suffix);
	}
};
