import { _Player } from "ServerStorage/classes/Player";
import { IGamepassList } from "./IGamepassList";

export interface IGamepassManager {
	Player: _Player;
	GamepassList: IGamepassList;
}
