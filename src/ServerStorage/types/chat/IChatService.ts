import { ISpeaker } from "./ISpeaker";

export interface IChatService extends Instance {
	eSpeakerAdded: BindableEvent;

	GetSpeaker(speakerName: string): ISpeaker;
	AddSpeaker(speakerName: string): ISpeaker;
}
