export interface Item {
  id: string
  name: string
  isFolder: boolean
  items: Item[]
}

export type NestedObject = {
  [key: string]:
    | NestedObject
    | NestedObjectArray
    | string
    | number
    | boolean
    | null
}
export type NestedObjectArray = { [key: string]: any } | NestedObjectArray[]
