import { IState, Command, StateChange, IChangesAdapter } from './state'
import { CommandWindow } from './command-window'

export class Compensator {
  private realState: IState;
  private prediction: IState;
  private changesAdapter: IChangesAdapter;
  private commandWindow = new CommandWindow();

  constructor(initialState: IState, changesAdapter: IChangesAdapter) {
    this.realState = initialState;
    this.prediction = this.realState.clone();
    this.changesAdapter = changesAdapter;
  }

  public verifyCommand(commandId: number): void {
    this.commandWindow.verifyCommand(commandId);
  }

  public addCommand(cmd: Command): void {
    this.commandWindow.addCommand(cmd);
  }

  public predictRender(): StateChange[] {
    this.commandWindow.executeCommands(this.realState, true);
    const verifiedChanges = this.realState.getStateChanges();
    this.prediction = this.realState.clone();
    this.commandWindow.executeCommands(this.prediction);
    const unverifiedChanges = this.prediction.getStateChanges();
    return this.changesAdapter.handleChanges(verifiedChanges, unverifiedChanges);
  }

  public getRealState(): IState {
    return this.realState;
  }

}
