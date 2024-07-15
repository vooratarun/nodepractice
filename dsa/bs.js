function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midVal = arr[mid];
  
      if (midVal === target) {
        return mid;
      } else if (target < midVal) {
        right = mid -1;
      } else {
        left = mid +1
      }
    }
  
    return -1; // Target not found
  }
  
  // Example usage:
  const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const target = 170;
  const index = binarySearch(sortedArray, target);
  
  if (index !== -1) {
    console.log(`Element found at index ${index}`);
  } else {
    console.log('Element not found');
  }
  