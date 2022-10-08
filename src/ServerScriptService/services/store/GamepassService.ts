import { Service, OnStart } from "@flamework/core";
import { Gamepass } from "ServerStorage/classes/store/gamepass/Gamepass";

export const GamepassBought = new Instance("BindableEvent");

@Service({})
export class GamepassService implements OnStart {
	onStart() {
		print("GamepassService starting..");
		GamepassBought.Event.Connect(this.gamepassBought);
		print("GamepassService started");
	}

	gamepassBought = (player: Player, gamepass: Gamepass): void => {};
}
