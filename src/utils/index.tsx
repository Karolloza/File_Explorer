import { Item } from "../types";

function removeNestedObjectById(array: Item[], idToRemove: string) {
  return array
    .filter((obj) => obj.id !== idToRemove)
    .map((obj) => {
      if (obj.items && Array.isArray(obj.items)) {
        obj.items = removeNestedObjectById(obj.items, idToRemove);
      }
      return obj;
    });
}

function updateObjectById(items: Item[], idToReplace: string, newObj: Item) {
  const newArrayItems = [...items];

  function replace(item: Item) {
    if (item.id === idToReplace) {
      return newObj;
    }
    if (item.items.length) {
      item.items = item.items.map(replace);
    }

    return item;
  }

  return newArrayItems.map(replace);
}

function findParentById(items: Item[], id: string) {
  let parent = null;

  function search(items: Item[], parentId: string | null) {
    for (const item of items) {
      if (item.id === id) {
        return parentId;
      } else if (item.isFolder && item.items && item.items.length) {
        const foundParentId = search(item.items, item.id);
        if (foundParentId !== null) {
          parent = items.find((x) => x.id === foundParentId);
          break;
        }
      }
    }
  }

  search(items, null);
  return parent;
}

const downloadJson = (data: Item[]) => {
  const jsonFormat = JSON.stringify(data);
  const blob = new Blob([jsonFormat], { type: "application/json" });

  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "newFile";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export {
  removeNestedObjectById,
  updateObjectById,
  findParentById,
  downloadJson,
};
