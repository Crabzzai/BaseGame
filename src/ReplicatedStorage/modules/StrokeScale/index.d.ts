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

declare const StrokeScale: StrokeScale;

export = StrokeScale;
