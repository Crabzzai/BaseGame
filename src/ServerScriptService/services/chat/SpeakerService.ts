import { Service, OnStart } from "@flamework/core";
import { ServerScriptService, MessagingService } from "@rbxts/services";
import { GeneralConfig } from "ServerStorage/configs/GeneralConfig";
import { AnnounceConfig } from "ServerStorage/configs/AnnounceConfig";
import { IChatService } from "ServerStorage/types/chat/IChatService";
import { ISpeaker } from "ServerStorage/types/chat/ISpeaker";

let ChatService: IChatService;
const GroupId = GeneralConfig.GroupId;

@Service({})
export class SpeakerService implements OnStart {
	AnnouncementSpeaker: ISpeaker | undefined;
	BroadcastSpeaker: ISpeaker | undefined;

	onStart() {
		print("SpeakerService starting..");
		ChatService = require(ServerScriptService.WaitForChild("ChatServiceRunner").WaitForChild(
			"ChatService",
		) as ModuleScript) as IChatService;

		this.AnnouncementSpeaker = ChatService.AddSpeaker("INFO | ");
		this.AnnouncementSpeaker.JoinChannel("ALL");
		this.AnnouncementSpeaker.SetExtraData("Font", Enum.Font.FredokaOne);
		this.AnnouncementSpeaker.SetExtraData("TextSize", 16);

		this.BroadcastSpeaker = ChatService.AddSpeaker("BROADCAST | ");
		this.BroadcastSpeaker.JoinChannel("ALL");
		this.BroadcastSpeaker.SetExtraData("Font", Enum.Font.FredokaOne);
		this.BroadcastSpeaker.SetExtraData("TextSize", 16);

		MessagingService.SubscribeAsync("Broadcast", this.broadcastListener);

		ChatService.eSpeakerAdded.Event.Connect(this.speakerAdded);

		task.spawn(() => {
			print("TASK SPAWNED");
			const bool = true;
			while (bool) {
				for (let i = 0; i < AnnounceConfig.Messages.size(); i++) {
					print("THIS WERE HANDLED");
					wait(AnnounceConfig.SecondsBetween);
					const msg = AnnounceConfig.Messages[i];
					if (this.AnnouncementSpeaker) {
						print("SPEAKER IS HERE");
						this.AnnouncementSpeaker.SayMessage(msg, "all");
					} else {
						print("SPEAKER IS NOT HERE");
					}
				}
			}
		});
		print("SpeakerService started");
	}

	speakerAdded = (speakerName: string): void => {
		const Speaker = ChatService.GetSpeaker(speakerName);
		const _player = Speaker.GetPlayer();
		if (!_player) return;
		switch (_player.GetRoleInGroup(GroupId)) {
			default: {
				const premium = _player.MembershipType === Enum.MembershipType.Premium;
				if (premium) {
					Speaker.SetExtraData("Tags", [
						{
							TagText: "VIP",
							TagColor: Color3.fromRGB(255, 215, 0),
						},
					]);
				}
				Speaker.SetExtraData("Font", Enum.Font.FredokaOne);
				break;
			}
		}
	};

	sendAnnouncement = (text: string): void => {
		if (this.AnnouncementSpeaker) this.AnnouncementSpeaker.SayMessage(text, "all");
	};

	broadcastListener = (message: { Data: unknown; Sent: number }): void => {
		const Data = message.Data as { JobSender: string; Text: string };
		if (Data.JobSender === game.JobId) return;
		if (this.BroadcastSpeaker) this.BroadcastSpeaker.SayMessage(Data.Text, "all");
	};

	sendBroadcast = (text: string): void => {
		MessagingService.PublishAsync("Broadcast", {
			JobSender: game.JobId,
			Text: text,
		});
	};
}
