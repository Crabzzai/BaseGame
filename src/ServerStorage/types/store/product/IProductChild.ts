import { _Player } from "ServerStorage/classes/Player";

export interface IProductChild {
	Id: number;
	Name: string;
	Price: number;
	Execute(player: _Player, secondPlayer?: Player): void;
}
