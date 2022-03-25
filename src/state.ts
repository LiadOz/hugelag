export interface IState {
  clone(): IState;
  handleInput(cmd: Command): void;
  getStateChanges(): StateChange[];
}

export interface Command {
  getId(): number;
  verifyCommand(): void;
  isVerified(): boolean;
}

export class SimpleCommand implements Command {
  private readonly commandId: number;
  private verified = false;
  constructor(commandId: number) {
    this.commandId = commandId;
  }

  public verifyCommand() {
    this.verified = true
  }

  public isVerified() {
    return this.verified;
  }

  public getId() {
    return this.commandId;
  }

}

export interface StateChange {
}

export interface IChangesAdapter {
  handleChanges(verifiedStateChanges: StateChange[],
    unverifiedStateChanges: StateChange[]): StateChange[];
}
