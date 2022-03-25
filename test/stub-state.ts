import { IState, Command } from '../src/state'

export class StubState implements IState {
  private executedCommands: Command[] = [];
  public handleInput(cmd: Command): void {
    this.executedCommands.push(cmd);
  }

  public getCommands(): Command[] {
    return this.executedCommands;
  }

  public clone(): IState {
    const newState = new StubState();
    for (const cmd of this.executedCommands)
      newState.handleInput(cmd);
    return newState;
  }

  public getStateChanges() {
    return [];
  }
}
