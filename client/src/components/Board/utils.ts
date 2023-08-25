// Function to check if the user is on a mobile device
export const isMobileDevice = () => {
  return window.matchMedia("(max-width: 768px)").matches; // Adjust the breakpoint as needed
};

// Function to sort the array with selected true values first
export const sortArray = <T extends { selected: boolean }>(array: T[]) => {
  return array
    .filter(item => item.selected) // Filter items with selected true
    .concat(array.filter(item => !item.selected)); // Concatenate items with selected false
};

// Main function to handle sorting based on device and selected key
export const sortDataBasedOnDevice = <T extends { selected: boolean }>(data: T[]) => {
  if (isMobileDevice()) {
    return sortArray(data);
  } else {
    return data; // No need to sort on non-mobile devices
  }
};
