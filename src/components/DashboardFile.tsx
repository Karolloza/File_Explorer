import { useState } from 'react'
import styled from 'styled-components'
import {
  FileIcon,
  FolderEmptyIcon,
  FolderFilledIcon,
  EditIcon,
  RemoveIcon,
} from './icons'
import {
  removeNestedObjectById,
  updateObjectById,
  findAllValuesByKey,
} from '../utils'
import { Item } from '../types'

const S = {
  DashboardFile: styled.div`
    position: relative;
    width: 180px;
    height: 120px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
    margin: 10px;
  `,
  DashboardFileActionsContainer: styled.div`
    position: absolute;
    right: 10px;
    width: 14px;
  `,
}

interface DashboardFileProps {
  fileData: Item
  data: Item[]
  setJsonData: (data: Item[]) => void
  currentTreeJsonData: Item
  setCurrentTreeJsonData: (data: Item) => void
  initialData: Item[]
}

const DashboardFile = ({
  fileData,
  data,
  setJsonData,
  currentTreeJsonData,
  setCurrentTreeJsonData,
  initialData,
}: DashboardFileProps) => {
  const [editFileName, setEditFileName] = useState(false)
  const [fileName, setFileName] = useState(fileData.name)
  const currentTree = currentTreeJsonData?.items || data

  const handleInputChange = (event: any) => {
    setFileName(event.target.value)
  }

  const findById = (items: Item[], id: string) =>
    items.find((item) => item.id === id)

  const handleInputSave = () => {
    const editedItem = findById(currentTree, fileData.id)
    let allNamesArr = findAllValuesByKey(initialData, 'name')
    if (editedItem) {
      if (allNamesArr.includes(fileName) && fileName !== editedItem.name) {
        setFileName(editedItem.name)
        alert('This name already exists')
      } else {
        editedItem.name = fileName
        setJsonData(updateObjectById(initialData, fileData.id, editedItem))
      }
    }
    setEditFileName(false)
  }

  const handleDelete = () => {
    if (initialData) {
      setJsonData(removeNestedObjectById(initialData, fileData.id))

      const index = currentTree.findIndex((object) => object.id === fileData.id)
      const newData = [...currentTree]
      newData.splice(index, 1)
      setCurrentTreeJsonData({ ...currentTreeJsonData, items: [...newData] })
    }
  }

  const handleFolderOpen = () => {
    const openFolder = findById(currentTree, fileData.id)
    if (fileData.isFolder && openFolder) {
      setCurrentTreeJsonData(openFolder)
    }
  }

  return (
    <S.DashboardFile>
      <div>
        {fileData.isFolder ? (
          fileData.items.length ? (
            <FolderFilledIcon />
          ) : (
            <FolderEmptyIcon />
          )
        ) : (
          <FileIcon />
        )}
      </div>
      {!editFileName ? (
        <div>{fileName}</div>
      ) : (
        <div>
          <input
            type='text'
            value={fileName}
            onChange={handleInputChange}
          ></input>
          <button onClick={handleInputSave}>Save</button>
        </div>
      )}

      <S.DashboardFileActionsContainer>
        <div>
          <EditIcon onClick={() => setEditFileName(true)} />
        </div>
        <div>
          <RemoveIcon onClick={() => handleDelete()} />
        </div>
        {fileData.isFolder && (
          <div>
            <button onClick={handleFolderOpen}>Open</button>
          </div>
        )}
      </S.DashboardFileActionsContainer>
    </S.DashboardFile>
  )
}

export default DashboardFile
