import { IGamepass } from "ServerStorage/types/store/gamepass/IGamepass";

export class Gamepass implements IGamepass {
	Id: number;
	Name: string;
	Description: string;
	Price: number;
	IsOwned: boolean;

	constructor(info: AssetProductInfo, isOwned: boolean) {
		this.Id = info.AssetId;
		this.Name = info.Name;
		this.Description = info.Description !== undefined ? info.Description : "";
		this.Price = info.PriceInRobux !== undefined ? info.PriceInRobux : 0;
		this.IsOwned = isOwned;
	}

	getId = (): number => {
		return this.Id;
	};

	getName = (): string => {
		return this.Name;
	};

	getDecription = (): string => {
		return this.Description;
	};

	getPrice = (): number => {
		return this.Price;
	};

	isOwned = (): boolean => {
		return this.IsOwned;
	};

	setOwned = (isOwned: boolean): void => {
		this.IsOwned = isOwned;
	};
}
