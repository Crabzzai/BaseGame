import { Profile } from "@rbxts/profileservice/globals";
import { _Player } from "ServerStorage/classes/Player";
import { IProfile } from "ServerStorage/types/IProfile";

const _players = new Map<string, _Player>();

const DataManager = {
	/**
	 * Set a player's profile
	 * @param player - The player to set the profile for
	 * @param profile - The profile to set
	 */
	set: (player: Player, profile: Profile<IProfile, unknown>) => {
		_players.set(player.Name, new _Player(player, profile));
	},
	get: (player: Player): Promise<_Player> => {
		return new Promise((resolve, reject) => {
			if (!_players.has(player.Name)) {
				reject("User doesn't have any data.");
			} else {
				resolve(_players.get(player.Name) as _Player);
			}
		});
	},
	delete: (player: Player) => {
		_players.delete(player.Name);
	},
};

export { DataManager };
