import { Item } from "../types";

function removeNestedObjectById(array: Item[], idToRemove: string) {
  // Filter out the objects at the current level
  return array
    .filter((obj) => obj.id !== idToRemove) // Remove the object if it matches the idToRemove
    .map((obj) => {
      if (obj.items && Array.isArray(obj.items)) {
        // If the object has an "items" property, recursively remove objects from it
        obj.items = removeNestedObjectById(obj.items, idToRemove);
      }
      return obj; // Return the modified object
    });
}

function updateObjectById(items: Item[], idToReplace: string, newObj: Item) {
  // Clone the items to avoid mutating the original array
  const newArrayItems = [...items];

  function replace(item: Item) {
    // Check if the current item is the one we want to replace
    if (item.id === idToReplace) {
      return newObj;
    }

    // If the item has a nested 'items' array, apply the replacement recursively
    if (item.items.length) {
      item.items = item.items.map(replace);
    }

    return item;
  }

  return newArrayItems.map(replace);
}

export { removeNestedObjectById, updateObjectById };
