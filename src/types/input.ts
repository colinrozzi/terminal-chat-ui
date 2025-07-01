/**
 * Centralized input handling types
 */

export interface KeyEvent {
  input: string;
  key: {
    return?: boolean;
    escape?: boolean;
    backspace?: boolean;
    delete?: boolean;
    leftArrow?: boolean;
    rightArrow?: boolean;
    upArrow?: boolean;
    downArrow?: boolean;
    ctrl?: boolean;
    meta?: boolean;
    [key: string]: boolean | undefined;
  };
}

export interface InputHandler {
  handleInput: (event: KeyEvent) => boolean; // return true if handled
  isActive: boolean;
  priority: number; // higher priority handlers get input first
}

export type FocusTarget = 'input' | 'help' | 'messages' | 'global';

export interface InputState {
  focusTarget: FocusTarget;
  inputContent: string;
  inputCursorPosition: number;
  inputMode: 'insert' | 'command';
}
