import { _Player } from "ServerStorage/classes/Player";

export interface IProductChildObject {
	Id: number;
	Execute(player: _Player, secondPlayer?: Player): void;
}
