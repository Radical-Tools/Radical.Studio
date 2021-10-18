const disabledEventPropagation = (e) => {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
};
export default disabledEventPropagation;
