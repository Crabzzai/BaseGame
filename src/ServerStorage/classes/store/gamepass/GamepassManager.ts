import { MarketplaceService } from "@rbxts/services";
import { Gamepass } from "./Gamepass";
import { GamepassBought } from "ServerScriptService/services/store/GamepassService";
import { IGamepassManager } from "ServerStorage/types/store/gamepass/IGamepassManager";
import { _Player } from "ServerStorage/classes/Player";
import { IGamepassList } from "ServerStorage/types/store/gamepass/IGamepassList";
import { GamepassList as _GamepassList } from "ServerStorage/configs/GamepassList";

export class GamepassManager implements IGamepassManager {
	Player: _Player;
	GamepassList = {} as IGamepassList;

	constructor(player: _Player) {
		this.Player = player;
		_GamepassList.forEach((id) => {
			const info = MarketplaceService.GetProductInfo(id);
			const isOwned = MarketplaceService.UserOwnsGamePassAsync(this.getPlayer().getId(), id);
			this.GamepassList[id] = new Gamepass(info, isOwned);
		});
	}

	getPlayer = (): _Player => {
		return this.Player;
	};

	getGamepassList = (): IGamepassList => {
		return this.GamepassList;
	};

	setOwnedGamepass = (id: number): void => {
		this.GamepassList[id].setOwned(true);
		GamepassBought.Fire(this.getPlayer().getPlayer(), this.GamepassList[id]);
	};

	isGamepassOwned = (id: number): boolean => {
		return this.GamepassList[id].isOwned();
	};
}
