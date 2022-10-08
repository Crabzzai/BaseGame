--[[
	      _             _           _____           _      
	     | |           | |         / ____|         | |     
	  ___| |_ _ __ ___ | | _____  | (___   ___ __ _| | ___ 
	 / __| __| '__/ _ \| |/ / _ \  \___ \ / __/ _` | |/ _ \
	 \__ \ |_| | | (_) |   <  __/  ____) | (_| (_| | |  __/
	 |___/\__|_|  \___/|_|\_\___| |_____/ \___\__,_|_|\___|
	                                                       
	                                                       
	Author: @Jumpathy
	Credits: @stravant (signals)
	Description: A module that handles UI stroke scaling (with some extra steps)
	Version: 1.0.1
	
	-- METHOD ARGUMENTS & RETURNS --
	
	
	:scaleGuiObject (or ScaleGuiObject)
		<instance> (UIStroke) "The UIStroke you're trying to scale"
		<integer> (Pixels) "The relative pixel size you're trying to achieve"
		<integer> (RelativeSize) "Set this to the workspace -> CurrentCamera.ViewportSize.X to make it look like it does in studio"
	<returns>: <array>
		:disconnect() or :Disconnect()
		
	
	:scaleBillboardGui (or ScaleBillboardGui)
		<instance> (BillboardGui) "The billboard gui you're trying to scale"
		<integer> (RelativeSize) "When you find a good position with the billboard UI 
		where the UIStroke looks nice, this variable is the AbsoluteSize.X property"
	<returns> <array>
		:disconnect() or :Disconnect() "This disconnects the scaling"
		:changeRelativeSize(<integer>) or :ChangeRelativeSize "This changes the relative size to something else"
		:ChangeStrokeSize(<instance (UIStroke)>,<integer>) or :ChangeStrokeSize "This method changes the relative stroke size of the specified UIStroke"
		
		
	-- SAMPLE CODE: --
	
	:scaleGuiObject (or ScaleGuiObject)
		local module = require(...)
		local uiStroke = ...
		
		local methods = module:scaleGuiObject(uiStroke,5,985) --> Start scaling:tm:
		task.wait(1);
		methods:Disconnect() --> Stop scaling (for some reason if you need to do this)
		
		
	:scaleBillboardGui (or ScaleBillboardGui)
		local module = require(...)
		local billboardUi = ...
		
		local methods = module:scaleBillboardGui(billboardUi,750) --> This automatically scales all of the UIStrokes inside of the billboard GUI
		local uiStroke = methods.Frame.UIStroke
		
		task.wait(1)
		methods:Disconnect() --> Disconnect events (for some reason again, if you need this)
		
		-- STROKE SIZE EQUATION: billboardGui.AbsoluteSize.X * (strokeSize/relativeSize)
		methods:changeRelativeSize(1500) --> Makes all UI strokes 2x smaller
		methods:changeStrokeSize(uiStroke,5) --> Changes how big the stroke is (in respect to the relative size you set)
		
]]

-- FORGIVE ME FOR THE HORRIBLE CODE BELOW PLS

local signal = require(script.Parent:WaitForChild("Signal"));
local runService = game:GetService("RunService");
local heartbeat = runService.Heartbeat;
local currentCamera = workspace.CurrentCamera;
local resolutionChanged = signal.new();
local scaleModule = {};

local onResolution = function(callback)
	coroutine.wrap(callback)(currentCamera.ViewportSize);
	return resolutionChanged:Connect(callback);
end

function scaleGuiObject(self,object,pixels,relativeSize)
	assert((self == scaleModule),"Expected ':' not '.' calling member function ScaleGuiObject");
	pixels = (pixels or object.Thickness);
	relativeSize = (relativeSize or 985);
	local ratio = pixels / relativeSize;
	local disconnectMethod;
	local methods = {};

	local connection = onResolution(function(absoluteSize)
		if(object:GetFullName() ~= object.Name) then
			local xSize = absoluteSize.X * ratio;
			object.Thickness = xSize;
		else
			disconnectMethod();
		end
	end)
	
	disconnectMethod = function()
		if(connection) then
			connection:Disconnect();
			connection = nil;
			for k,_ in pairs(methods) do
				methods[k] = nil;
			end
		end
	end

	methods["Disconnect"] = disconnectMethod;
	methods["disconnect"] = disconnectMethod;
	
	return methods;
end

scaleModule["scaleGuiObject"] = scaleGuiObject;
scaleModule["ScaleGuiObject"] = scaleGuiObject;

function scaleBillboardGui(self,billboardGui,relativeSize)
	assert((self == scaleModule),"Expected ':' not '.' calling member function ScaleBillboardGui");
	local uiStrokes = {};
	local original = {};
	local m,p = currentCamera,"CFrame";
	local methods = {};

	local render = function()
		if(billboardGui:GetFullName() ~= billboardGui.Name) then
			local holderObject = (billboardGui.Adornee == nil and (billboardGui.Parent:IsA("BasePart") and billboardGui.Parent) or billboardGui.Adornee);
			assert((holderObject) ~= nil,"BillboardGUI does not have a valid parent or adornee.");
			local distanceFrom = ((Vector3.new(m[p]["X"],m[p]["Y"],m[p]["Z"]) - billboardGui.StudsOffset) - holderObject.Position).magnitude;
			local maxViewDistance = billboardGui.MaxDistance;
			local inViewDistance = (distanceFrom <= maxViewDistance + 1);
			for _,stroke in pairs(uiStrokes) do
				if(inViewDistance) then
					local ratio = original[stroke]/relativeSize;
					local newSize = billboardGui.AbsoluteSize.X * ratio;
					if(stroke.Thickness ~= newSize) then
						stroke.Thickness = newSize;
					end
				elseif(stroke.Thickness ~= 0) then
					stroke.Thickness = 0;
				end
			end
		else
			pcall(function()
				methods:Disconnect();
			end)
		end
	end
	
	local check = function(child)
		if(child:IsA("UIStroke")) then
			original[child] = child.Thickness; --> I'm probably on a watchlist now
			table.insert(uiStrokes,child);
			render();
		end
	end
	for _,child in pairs(billboardGui:GetDescendants()) do
		coroutine.wrap(check)(child);
	end
	
	local signal1 = billboardGui.DescendantAdded:Connect(check);
	local signal2 = currentCamera.Changed:Connect(render);
	local signal3 = billboardGui.Changed:Connect(render);
	
	local disconnectMethod = function()
		methods = {};
		signal1:Disconnect();
		signal2:Disconnect();
		signal3:Disconnect();
	end
	
	methods["Disconnect"] = disconnectMethod;
	methods["disconnect"] = disconnectMethod;
	
	local changeRelativeSize = function(self,new)
		--assert((self == methods),"Expected ':' not '.' calling member function changeRelativeSize");
		assert((type(new) == "number"),("Expected <integer> not <%s>"):format(type(new)));
		relativeSize = new;
		coroutine.wrap(render)();
	end
	
	local changeStrokeSize = function(self,uiStroke,new)
		--assert((self == methods),"Expected ':' not '.' calling member function changeStrokeSize");
		assert((type(new) == "number"),("Expected <integer> not <%s>"):format(type(new)));
		original[uiStroke] = new;
		coroutine.wrap(render)();
	end
	
	methods["ChangeStrokeSize"] = changeStrokeSize;
	methods["changeStrokeSize"] = changeStrokeSize;
	
	methods["ChangeRelativeSize"] = changeRelativeSize;
	methods["changeRelativeSize"] = changeRelativeSize;
	
	return methods;
end

scaleModule["scaleBillboardGui"] = scaleBillboardGui;
scaleModule["ScaleBillboardGui"] = scaleBillboardGui;

local lastMovement = nil;
currentCamera:GetPropertyChangedSignal("ViewportSize"):Connect(function() --> forgive me pls
	local currentKey = tick();
	lastMovement = currentKey;
	heartbeat:Wait();
	if(lastMovement == currentKey) then
		resolutionChanged:Fire(currentCamera.ViewportSize);
	end
end)

return scaleModule;