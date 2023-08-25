// Function to check if the user is on a mobile device
export const isMobileDevice = () => {
  return window.matchMedia("(max-width: 768px)").matches; // Adjust the breakpoint as needed
};

export const sortArray = <T extends { image: string }>(array: T[], element: T) => {
  return [element, ...array.filter(boardItem => (
    boardItem.image !== element.image
  ))];
};

export const getId = <T extends { image: string }>(array: T[], match: string) => {
  const item = array.find(item => item.image === match);
  return item as T;
};

export const sortDataBasedOnDevice = <T extends { image: string }>(data: T[], element: T) => {
  if (isMobileDevice()) {
    return sortArray(data, element);
  } else {
    return data; // No need to sort on non-mobile devices
  }
};
