export const isActive = (index, history) => index === history.prev.length - 1;
export const isFirst = (history) => history.prev.length === 0;
export const isLast = (history) => history.next.length === 0;
export const isPrevLocked = (history) =>
  history.prev.filter((item) => !item.isLocked).length > 0;
export const getUnlockedCount = (history) =>
  history.prev.filter((item) => !item.isLocked).length;
