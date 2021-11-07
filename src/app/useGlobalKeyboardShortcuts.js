import useKeyboardShortcut from '../utils/keyboard/useKeyboardShortcut';

const useGlobalKeyboardShortcuts = (undoCmd, redoCmd, onToggleAdminDialog) => {
  useKeyboardShortcut(['Control', 'Z'], undoCmd, { overrideSystem: false });
  useKeyboardShortcut(['Control', 'Y'], redoCmd, { overrideSystem: false });
  useKeyboardShortcut(['Control', 'Q'], onToggleAdminDialog, {
    overrideSystem: false,
  });
};
export default useGlobalKeyboardShortcuts;
