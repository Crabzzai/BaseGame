import { IProductChildList } from "ServerStorage/types/store/product/IProductChildList";
import { IProductChildObject } from "ServerStorage/types/store/product/IProductChildObject";
import { _Player } from "../../Player";
import { ProductChild } from "./ProductChild";

const ParentFolder = script.Parent as Folder;
const StoreFolder = ParentFolder.Parent as Folder;
const Classes = StoreFolder.Parent as Folder;
const Components = Classes.Parent as Folder;
const Configs = Components.WaitForChild("configs") as Folder;
const Products = Configs.WaitForChild("products") as Folder;
const Children = Products.GetChildren();

export class ProductManager {
	Player: _Player;
	ProductList = {} as IProductChildList;

	constructor(player: _Player) {
		this.Player = player;
		Children.forEach((child: Instance) => {
			if (child.IsA("ModuleScript")) {
				const _child = child as ModuleScript;
				const obj = require(_child) as { Child: IProductChildObject };
				this.ProductList[obj.Child.Id] = new ProductChild(obj.Child);
			}
		});
	}

	getPlayer = (): _Player => {
		return this.Player;
	};

	getProductList = (): IProductChildList => {
		return this.ProductList;
	};

	executeChild = (id: number, secondPlayer?: Player): void => {
		if (this.ProductList[id]) this.ProductList[id].Execute(this.getPlayer(), secondPlayer);
	};
}
