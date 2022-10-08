import { _Player } from "ServerStorage/classes/Player";
import { IProductChildList } from "./IProductChildList";

export interface IProductManager {
	Player: _Player;
	ProductList: IProductChildList;
}
