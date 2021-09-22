export const UNDO = '@@redux-deep-diff/UNDO';
export const REDO = '@@redux-deep-diff/REDO';
export const JUMP = '@@redux-deep-diff/JUMP';
export const JUMPABSOLUTE = '@@redux-deep-diff/JUMPABSOLUTE';
export const CLEAR = '@@redux-deep-diff/CLEAR';
export const REMOVE = '@@redux-deep-diff/REMOVE';
export const LOCK = '@@redux-deep-diff/LOCK';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
export const jump = (index) => ({ type: JUMP, index });
export const jumpAbsolute = (index) => ({ type: JUMPABSOLUTE, index });
export const clear = () => ({ type: CLEAR });
export const remove = () => ({ type: REMOVE });
export const lock = () => ({ type: LOCK });
