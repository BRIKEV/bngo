export const removeDuplicateObjects = <T extends { id: number }>(arr: T[]) => {
  const uniqueCodes = new Set(); // Create a Set to store unique codes
  const uniqueObjects = []; // Array to store unique objects
  
  for (const obj of arr) {
    if (!uniqueCodes.has(obj.id)) {
      uniqueCodes.add(obj.id); // Add the code to the Set if it's not already there
      uniqueObjects.push(obj); // Add the object to the uniqueObjects array
    }
  }
  
  return uniqueObjects;
};

export const isMobileDevice = () => {
  return window.matchMedia("(max-width: 768px)").matches; // Adjust the breakpoint as needed
}