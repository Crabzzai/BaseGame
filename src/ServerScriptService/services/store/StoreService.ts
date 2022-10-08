import { Service, OnStart } from "@flamework/core";
import { MarketplaceService, Players } from "@rbxts/services";
import { Functions } from "ServerScriptService/network";
import { _Player } from "ServerStorage/classes/Player";
import { DataManager } from "ServerStorage/modules/DataManager";

@Service({})
export class StoreService implements OnStart {
	onStart() {
		print("StoreService starting..");
		MarketplaceService.PromptGamePassPurchaseFinished.Connect(this.promptGamePassPurchaseFinished);

		MarketplaceService.PromptProductPurchaseFinished.Connect(this.promptProductPurchaseFinished);

		Functions.IsGamepassOwned.setCallback(this.isGamepassOwned);
		print("StoreService started");
	}

	promptGamePassPurchaseFinished = (player: Player, gamePassId: number, wasPurchased: boolean): void => {
		if (wasPurchased) {
			const playerData = DataManager.get(player) as Promise<_Player>;
			const resolved = playerData.await();
			if (resolved[0]) {
				const _player = resolved[1] as _Player;
				const _GamepassManager = _player.getGamepassManager();
				_GamepassManager.setOwnedGamepass(gamePassId);
			}
		}
	};

	promptProductPurchaseFinished = (userId: number, productId: number, isPurchased: boolean): void => {
		if (isPurchased) {
			const player = Players.GetPlayerByUserId(userId);
			if (player) {
				const playerData = DataManager.get(player) as Promise<_Player>;
				const resolved = playerData.await();
				if (resolved[0]) {
					const _player = resolved[1] as _Player;
					const _ProductManager = _player.getProductManager();
					_ProductManager.executeChild(productId);
				}
			}
		}
	};

	isGamepassOwned = (player: Player, id: number): boolean => {
		const playerData = DataManager.get(player) as Promise<_Player>;
		const resolved = playerData.await();
		if (resolved[0]) {
			const _player = resolved[1] as _Player;
			const _GamepassManager = _player.getGamepassManager();
			return _GamepassManager.isGamepassOwned(id);
		}
		return false;
	};
}
