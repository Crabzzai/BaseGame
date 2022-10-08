import { Profile } from "@rbxts/profileservice/globals";
import { GamepassManager } from "ServerStorage/classes/store/gamepass/GamepassManager";
import { ProductManager } from "ServerStorage/classes/store/product/ProductManager";
import { IProfile } from "./IProfile";

export interface IPlayer {
	Id: number;
	Name: string;
	Player: Player;
	Profile: Profile<IProfile, unknown>;
	ProductManager: ProductManager;
	GamepassManager: GamepassManager;
}
