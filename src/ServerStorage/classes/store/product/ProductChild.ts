import { MarketplaceService } from "@rbxts/services";
import { IProductChild } from "ServerStorage/types/store/product/IProductChild";
import { IProductChildObject } from "ServerStorage/types/store/product/IProductChildObject";

export class ProductChild implements IProductChild {
	Id: number;
	Name: string;
	Price: number;
	Execute;

	constructor(info: IProductChildObject) {
		this.Id = info.Id;
		const ProductInfo = MarketplaceService.GetProductInfo(this.Id, Enum.InfoType.Product);
		this.Name = ProductInfo.Name;
		this.Price = ProductInfo.PriceInRobux !== undefined ? ProductInfo.PriceInRobux : 0;
		this.Execute = info.Execute;
	}
}
