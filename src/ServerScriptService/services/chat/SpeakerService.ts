import { Service, OnStart } from "@flamework/core";
import { ServerScriptService } from "@rbxts/services";
import { GeneralConfig } from "ServerStorage/configs/GeneralConfig";
import { IChatService } from "ServerStorage/types/chat/IChatService";

let ChatService: IChatService;
const GroupId = GeneralConfig.GroupId;

@Service({})
export class SpeakerService implements OnStart {
	onStart() {
		print("SpeakerService starting..");
		ChatService = require(ServerScriptService.WaitForChild("ChatServiceRunner").WaitForChild(
			"ChatService",
		) as ModuleScript) as IChatService;

		ChatService.eSpeakerAdded.Event.Connect(this.speakerAdded);
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
}
