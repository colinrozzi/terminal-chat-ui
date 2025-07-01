/**
 * Central input management hook
 */

import { useState, useCallback, useRef } from 'react';
import type { KeyEvent, InputHandler, FocusTarget, InputState } from '../types/input.js';

export function useInputManager() {
  const [inputState, setInputState] = useState<InputState>({
    focusTarget: 'input',
    inputContent: '',
    inputCursorPosition: 0,
    inputMode: 'insert'
  });

  const handlersRef = useRef<Map<string, InputHandler>>(new Map());

  // Register an input handler
  const registerHandler = useCallback((id: string, handler: InputHandler) => {
    handlersRef.current.set(id, handler);
  }, []);

  // Unregister an input handler
  const unregisterHandler = useCallback((id: string) => {
    handlersRef.current.delete(id);
  }, []);

  // Central input dispatcher
  const dispatchInput = useCallback((event: KeyEvent) => {
    // Get all active handlers sorted by priority
    const activeHandlers = Array.from(handlersRef.current.values())
      .filter(handler => handler.isActive)
      .sort((a, b) => b.priority - a.priority);

    // Try each handler until one handles the input
    for (const handler of activeHandlers) {
      if (handler.handleInput(event)) {
        return true; // Input was handled
      }
    }

    // If no handler processed the input, return false
    return false;
  }, []);

  // Helper methods for updating input state
  const updateInputContent = useCallback((content: string) => {
    setInputState(prev => ({ ...prev, inputContent: content }));
  }, []);

  const updateInputCursor = useCallback((position: number) => {
    setInputState(prev => ({ ...prev, inputCursorPosition: position }));
  }, []);

  const updateInputMode = useCallback((mode: 'insert' | 'command') => {
    setInputState(prev => ({ ...prev, inputMode: mode }));
  }, []);

  const setFocus = useCallback((target: FocusTarget) => {
    setInputState(prev => ({ ...prev, focusTarget: target }));
  }, []);

  const clearInput = useCallback(() => {
    setInputState(prev => ({
      ...prev,
      inputContent: '',
      inputCursorPosition: 0,
      inputMode: 'insert'
    }));
  }, []);

  return {
    inputState,
    dispatchInput,
    registerHandler,
    unregisterHandler,
    updateInputContent,
    updateInputCursor,
    updateInputMode,
    setFocus,
    clearInput
  };
}
