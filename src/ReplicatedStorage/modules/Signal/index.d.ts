interface Signal {
	Connect(): {
		Disconnect(): void;
	};
	DisconnectAll(): void;
	Fire(...args: unknown[]): void;
	Wait(sm: LuaTuple<never>): LuaTuple<never>;
}

declare const Signal: Signal;

export = Signal;
