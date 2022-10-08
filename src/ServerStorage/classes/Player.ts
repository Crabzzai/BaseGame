import { Profile } from "@rbxts/profileservice/globals";
import { Players, Workspace } from "@rbxts/services";
import { IPlayer } from "ServerStorage/types/IPlayer";
import { IProfile } from "ServerStorage/types/IProfile";
import { GamepassManager } from "./store/gamepass/GamepassManager";
import { ProductManager } from "./store/product/ProductManager";

export class _Player implements IPlayer {
	Id: number;
	Name: string;
	Player: Player;
	Profile: Profile<IProfile, unknown>;
	ProductManager: ProductManager;
	GamepassManager: GamepassManager;

	constructor(player: Player, profile: Profile<IProfile, unknown>) {
		this.Id = player.UserId;
		this.Name = player.Name;
		this.Player = player;
		this.Profile = profile;
		this.ProductManager = new ProductManager(this);
		this.GamepassManager = new GamepassManager(this);
	}

	getId = (): number => {
		return this.Id;
	};

	getName = (): string => {
		return this.Name;
	};

	getPlayer = (): Player => {
		return this.Player;
	};

	getProfile = (): Profile<IProfile, unknown> => {
		return this.Profile;
	};

	getCharacter = (): Model => {
		let Character: Model;
		if (!this.getPlayer().Character) {
			this.getPlayer().CharacterAdded.Wait();
			Character = this.getPlayer().Character as Model;
		} else Character = this.getPlayer().Character as Model;
		return Character;
	};

	teleportTo = (loc: Vector3, faceAngle?: number, freeze?: boolean): void => {
		const Character = this.getCharacter();
		const Humanoid = Character.WaitForChild("Humanoid") as Humanoid;

		if (freeze) {
			Humanoid.SetAttribute("DefaultWalkSpeed", Humanoid.WalkSpeed);
			Humanoid.SetAttribute("DefaultJumpPower", Humanoid.JumpPower);
			Humanoid.WalkSpeed = 0;
			Humanoid.JumpPower = 0;
		}

		let RootPartY: number;
		if (Humanoid.RigType === Enum.HumanoidRigType.R15)
			RootPartY = (Humanoid.RootPart as BasePart).Size.Y * 0.5 + Humanoid.HipHeight;
		else {
			const LeftLeg = Character.WaitForChild("LeftLeg") as Part;
			RootPartY = (Humanoid.RootPart as BasePart).Size.Y * 0.5 + LeftLeg.Size.Y + Humanoid.HipHeight;
		}

		const Position = new CFrame(loc.add(new Vector3(0, RootPartY, 0)));
		const Orientation = faceAngle === undefined ? new CFrame() : CFrame.Angles(0, math.rad(faceAngle), 0);
		if (Workspace.StreamingEnabled) {
			const player = Players.GetPlayerFromCharacter(Character);
			player?.RequestStreamAroundAsync(loc);
		}
		Character.MoveTo(Position.mul(Orientation).Position);

		if (freeze) {
			Humanoid.WalkSpeed = Humanoid.GetAttribute("DefaultWalkSpeed") as number;
			Humanoid.JumpPower = Humanoid.GetAttribute("DefaultJumpPower") as number;
		}
	};

	getProductManager = (): ProductManager => {
		return this.ProductManager;
	};

	getGamepassManager = (): GamepassManager => {
		return this.GamepassManager;
	};
}
