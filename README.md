# What is this?
This is a Roblox TypeScript Game Skeleton, made with [Flamework](https://github.com/rbxts-flamework/), [Roblox-TS](https://roblox-ts.com/) and [Rojo](https://rojo.space/).

## Prerequistes
- Visual Studio Code
- Roblox Studio
- NodeJS

# Overview
- [Installation](#installation)
	- [Setup Workspace](#setup-workspace)
	- [Roblox Studio Setup](#roblox-studio-setup)
	- [Visual Studio Code Setup](#visual-studio-code-setup)
	- [Connecting VSC and Roblox Studio](#connecting-vsc-and-roblox-studio)
- [File Structure](#file-structure)
	- [ReplicatedFirst](#replicatedfirst)
	- [ReplicatedStorage](#replicatedstorage)
	- [ServerScriptService](#serverscriptservice)
	- [ServerStorage](#serverstorage)
	- [StarterPlayerScripts](#starterplayerscripts)

# Installation
This project requires you to setup multiple things according to work properly.

## Setup Workspace
1. Clone the repository: `git clone https://github.com/Crabzzai/BaseGame`
2. Go into your new workspace folder: `cd BaseGame`
3. Install the NodeJS requirements: `npm install`

## Roblox Studio Setup
1. Open a Roblox Studio project.
2. Select the 'Plugins' tab.
3. Press 'Manage Plugins'
4. Press the blue '+' button, it will open the Marketplace in the plugins tab.
5. Search for 'rojo'.
6. Install Rojo 7.
7. Go back to the Manage Plugins window.
8. Make sure Rojo is enabled, and press the small edit button below the description.
9. Make sure to enable the option labelled 'Script Injection'.
10. Close those windows, your done!

## Visual Studio Code Setup
1. In the extensions tab, install both 'roblox-ts' and 'Rojo - Roblox Studio Sync'.
2. Restart Visual Studio Code.
3. Clone the repository, open the repository as a folder in Visual Studio Code.
4. Make a new terminal, in the termal type `npm i` to install the NodeJS packages.
5. After the packages are done installing, Once done, open the command palette (CTRL+SHIFT+P) and search for 'rojo' and look for 'Rojo: Open Menu'
6. Select that option, then click to Install Rojo. Once installed, move to the next step.
7. Open the command palatte (CTRL+SHIFT+P) awaing and search for 'roblox-ts' you should find the option 'roblox-ts: Start Compiler', select it.
8. An output window should open, wait for the output to say 'Found 0 errors. Watching for file changes.'.
9. Open the command palette for a final time and search for 'rojo' and look for 'Rojo: Open Menu'
10. Select the option, then click 'default.project.json' at the bottom to serve it.

## Connecting VSC and Roblox Studio
1. Open Roblox Studio
2. Go to the Plugins tab
3. Click the button labelled 'Rojo' with a red R, a window should appear on the left.
4. Press connect.
5. Your done!

# File Structure
├── src/\
│	├── [ReplicatedFirst](#replicatedfirst)\
│	├── [ReplicatedStorage](#replicatedstorage)\
│	├── [ServerScriptService](#serverscriptservice)\
│	├── [ServerStorage](#serverstorage)\
│	└── [StarterPlayerScripts](#starterplayerscripts)

## ReplicatedFirst
A container whose contents are replicated to all clients (but not back to the server) first before anything else. - [Read more](https://create.roblox.com/docs/reference/engine/classes/ReplicatedFirst).

## ReplicatedStorage
ReplicatedStorage is a general container service for objects that are available to both the server and connected game clients. - [Read more](https://create.roblox.com/docs/reference/engine/classes/ReplicatedStorage).

├── [components](https://fireboltofdeath.dev/docs/flamework/additional-modules/components/creating-a-component)/\
├── modules/\
│	├── [Signal](#signal)\
│	├── [Spring](#spring)\
│	├── [StrokeScale](#strokescale)\
│	└── [Utils](#utils)

### Signal
Alternative bindable event system
```ts
interface Signal {
	Connect(): {
		Disconnect(): void;
	};
	DisconnectAll(): void;
	Fire(...args: unknown[]): void;
	Wait(sm: LuaTuple<never>): LuaTuple<never>;
}
```

### Spring
A physical model of a spring, useful in many applications. Properties only evaluate upon index making this model good for lazy applications
```ts
interface Spring<T extends Vector3 | number> {
	Damper: number;
	Speed: number;

	Target: T;

	readonly Position: T;
	readonly Velocity: T;
}
```

### StrokeScale
A module that handles UI stroke scaling (with some extra steps)
```ts
interface StrokeScale {
	ScaleGuiObject(
		UIStroke: UIStroke,
		Pixels?: number,
		RelativeSize?: number,
	): {
		Disconnect(): void;
	};
	ScaleBillboardGui(
		BillboardGui: BillboardGui,
		RelativeSize: number,
	): {
		Disconnect(): void;
		ChangeRelativeSize(RelativeSize: number): void;
		ChangeStrokeSize(UIStroke: UIStroke, Size: number): void;
	};
}
```

### Utils

## ServerScriptService
ServerScriptService is a container service for Script, ModuleScript and other scripting-related assets that are only meant for server use. - [Read more](https://create.roblox.com/docs/reference/engine/classes/ServerScriptService).

├── [services](https://fireboltofdeath.dev/docs/flamework/guides/creating-a-singleton#basic-service)/\
├── network.ts\
└── runtime.server.ts

## ServerStorage
A container whose contents are only accessible on the server. Objects descending from ServerStorage will not replicate to the client and will not be accessible from LocalScripts. - [Read more](https://create.roblox.com/docs/reference/engine/classes/ServerStorage).

├── classes/\
├── [components](https://fireboltofdeath.dev/docs/flamework/additional-modules/components/creating-a-component)/\
├── configs/\
├── modules/\
│	└── [DataManager](#datamanager)\
└── types/

### DataManager
```ts
DataManager.set(player: Player, profile: Profile<IProfile, unknown>): void;

DataManager.get(player: Player): Promise<_Player>;

DataManager.delete(player: Player): void;
```

## StarterPlayerScripts
The StarterPlayerScripts is a container object located within the StarterPlayer service. It contains LocalScripts and other objects to be copied to the PlayerScripts container once when a Player joins the game. - [Read more](https://create.roblox.com/docs/reference/engine/classes/StarterPlayerScripts).

├── [components](https://fireboltofdeath.dev/docs/flamework/additional-modules/components/creating-a-component)/\
├── [controllers](https://fireboltofdeath.dev/docs/flamework/guides/creating-a-singleton#basic-controller)/\
├── network.ts\
└── runtime.server.ts