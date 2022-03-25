import { CommandWindow } from '../src/command-window'
import { SimpleCommand, Command } from '../src/state'
import { StubState } from './stub-state'

function getCommandsIds(commands: Command[]): number[] {
  const result: number[] = [];
  for (const cmd of commands)
    result.push(cmd.getId());
  return result;
}

it("happy path", () => {
  const cw = new CommandWindow();
  const state = new StubState();
  cw.addCommand(new SimpleCommand(1))
  cw.addCommand(new SimpleCommand(2))
  cw.addCommand(new SimpleCommand(3))
  cw.executeCommands(state);
  expect(getCommandsIds(state.getCommands())).toStrictEqual([1, 2, 3]);
});

it("check verified commands are first", () => {
  const cw = new CommandWindow();
  const state = new StubState();
  cw.addCommand(new SimpleCommand(1))
  cw.addCommand(new SimpleCommand(2))
  cw.addCommand(new SimpleCommand(3))
  cw.verifyCommand(3)
  cw.verifyCommand(2)
  cw.executeCommands(state);
  expect(getCommandsIds(state.getCommands())).toStrictEqual([3, 2, 1]);
});

it("check execution of only verified", () => {
  const cw = new CommandWindow();
  const state = new StubState();
  cw.addCommand(new SimpleCommand(1))
  cw.addCommand(new SimpleCommand(2))
  cw.addCommand(new SimpleCommand(3))
  cw.verifyCommand(2)
  cw.executeCommands(state, true);
  expect(getCommandsIds(state.getCommands())).toStrictEqual([2]);
});
