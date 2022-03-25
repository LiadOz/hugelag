import { IState, Command } from './state'


export class CommandWindow {
  private verified: Command[] = [];
  private unverified: Command[] = [];

  public addCommand(cmd: Command): void {
    if (cmd.isVerified())
      this.verified.push(cmd);
    else
      this.unverified.push(cmd);
  }

  public executeCommands(state: IState, onlyVerified = false): void {
    // verified commands are always executed first
    for (const cmd of this.verified) {
      state.handleInput(cmd);
    }
    this.verified = []
    if (onlyVerified)
      return;

    for (const cmd of this.unverified) {
      state.handleInput(cmd);
    }
  }

  public verifyCommand(commandId: number): void {
    const index = this.unverified.findIndex((cmd: Command) => cmd.getId() === commandId);
    const cmd = this.unverified.splice(index, 1)[0];
    this.verified.push(cmd);
  }

}
