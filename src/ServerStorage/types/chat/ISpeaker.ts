export interface ISpeaker {
	GetPlayer(): Player;
	SetExtraData(
		key: "Tags",
		arr: Array<{
			TagText: string;
			TagColor: Color3;
		}>,
	): void;
	SetExtraData(key: "ChatColor", color: Color3): void;
	SetExtraData(key: "NameColor", color: Color3): void;
	SetExtraData(key: "Font", font: Enum.Font): void;
	SetExtraData(key: "TextSize", size: number): void;
	JoinChannel(channel: string): void;
	SayMessage(message: string, channel: string): void;
}
