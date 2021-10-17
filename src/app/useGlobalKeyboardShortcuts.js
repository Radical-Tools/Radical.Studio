import useKeyboardShortcut from '../utils/keyboard/useKeyboardShortcut';

const useGlobalKeyboardShortcuts = (undoCmd, redoCmd) => {
  useKeyboardShortcut(['Control', 'Z'], undoCmd, { overrideSystem: false });
  useKeyboardShortcut(['Control', 'Y'], redoCmd, { overrideSystem: false });
};
export default useGlobalKeyboardShortcuts;
