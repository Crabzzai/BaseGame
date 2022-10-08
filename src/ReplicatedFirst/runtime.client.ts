const Players = game.GetService("Players");
const ReplicatedFirst = game.GetService("ReplicatedFirst");

const LocalPlayer = Players.LocalPlayer;
const PlayerGui = LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

const ScreenGui = new Instance("ScreenGui");
ScreenGui.IgnoreGuiInset = true;

const TextLabel = new Instance("TextLabel");
TextLabel.Size = new UDim2(1, 0, 1, 0);
TextLabel.BackgroundColor3 = Color3.fromRGB(0, 20, 40);
TextLabel.Font = Enum.Font.GothamMedium;
TextLabel.TextColor3 = new Color3(0.8, 0.8, 0.8);
TextLabel.Text = "Loading BaseGame";
TextLabel.TextSize = 28;
TextLabel.Parent = ScreenGui;

ScreenGui.Parent = PlayerGui;

ReplicatedFirst.RemoveDefaultLoadingScreen();

if (!game.IsLoaded()) game.Loaded.Wait();
ScreenGui.Destroy();
