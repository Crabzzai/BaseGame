import { Networking } from "@flamework/networking";

interface ServerEvents {}

interface ClientEvents {}

interface ServerFunctions {
	IsGamepassOwned: (id: number) => boolean;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
