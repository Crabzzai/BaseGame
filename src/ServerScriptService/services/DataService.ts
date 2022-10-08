import { Service, OnInit } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Players } from "@rbxts/services";
import { _Player } from "ServerStorage/classes/Player";
import { ProfileTemplate } from "ServerStorage/configs/ProfileTemplate";
import { DataManager } from "ServerStorage/modules/DataManager";

const ProfileStore = ProfileService.GetProfileStore("DataStoreTest1", ProfileTemplate);

@Service({})
export class DataService implements OnInit {
	onInit() {
		print("DataService initializing..");
		Players.PlayerAdded.Connect(this.onPlayerAdded);
		Players.PlayerRemoving.Connect(this.onPlayerRemoving);
		print("DataService initialized");
	}

	onPlayerAdded = (player: Player): void => {
		print(`Player ${player.Name} joined.`);
		function onRelease() {
			DataManager.delete(player);
			player.Kick();
		}

		const profile = ProfileStore.LoadProfileAsync(`Player_${player.UserId}`);

		if (profile !== undefined) {
			profile.AddUserId(player.UserId);
			profile.Reconcile();
			profile.ListenToRelease(onRelease);

			if (player.IsDescendantOf(Players)) {
				DataManager.set(player, profile);
			} else {
				profile.Release();
			}
		}
	};

	onPlayerRemoving = (player: Player): void => {
		print(`Player ${player.Name} left.`);
		try {
			DataManager.get(player)
				.then((playerData) => {
					const _player = playerData as _Player;
					const profile = _player.getProfile();
					profile.Release();
					DataManager.delete(player);
				})
				.catch((err) => {
					warn(`Data warning: ${err}`);
				});
		} catch (err) {
			warn(`Data warning: ${err}`);
		}
	};
}
