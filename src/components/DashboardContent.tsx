import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import { Item } from '../types/index'
import DashboardFile from './DashboardFile'
import {
  updateObjectById,
  findParentById,
  downloadJson,
  findAllValuesByKey,
} from '../utils'
import {
  BackArrowIcon,
  AddFileIcon,
  AddFolderIcon,
  DownloadFileIcon,
} from './icons'

const S = {
  DashboardContent: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  DashboardContentHeader: styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
  `,
}

interface DashboardContentProps {
  data: Item[]
  setJsonData: (data: Item[]) => void
  currentTreeJsonData: Item
  setCurrentTreeJsonData: (data: Item | null) => void
}

const DashboardContent = ({
  data,
  setJsonData,
  currentTreeJsonData,
  setCurrentTreeJsonData,
}: DashboardContentProps) => {
  const [newFileName, setNewFileName] = useState<string>('')
  const [dialogInfo, setDialogInfo] = useState(false)
  const [isFile, setIsFile] = useState(false)
  const dialog = document.querySelector('dialog')

  const handleAddFile = () => {
    let newId = uuidv4()

    if (currentTreeJsonData?.id) {
      setJsonData(
        updateObjectById(data, currentTreeJsonData.id, {
          ...currentTreeJsonData,
          items: [
            ...currentTreeJsonData.items,
            {
              id: newId,
              name: newFileName,
              isFolder: false,
              items: [],
            },
          ],
        })
      )
      setCurrentTreeJsonData({
        ...currentTreeJsonData,
        items: [
          ...currentTreeJsonData.items,
          {
            id: newId,
            name: newFileName,
            isFolder: false,
            items: [],
          },
        ],
      })
    } else {
      setJsonData([
        ...data,
        {
          id: newId,
          name: newFileName,
          isFolder: false,
          items: [],
        },
      ])
    }
    setNewFileName('')
    setIsFile(false)
  }

  const handleAddFolder = () => {
    let newId = uuidv4()

    if (currentTreeJsonData?.id) {
      setJsonData(
        updateObjectById(data, currentTreeJsonData.id, {
          ...currentTreeJsonData,
          items: [
            ...currentTreeJsonData.items,
            {
              id: newId,
              name: newFileName,
              isFolder: true,
              items: [],
            },
          ],
        })
      )
      setCurrentTreeJsonData({
        ...currentTreeJsonData,
        items: [
          ...currentTreeJsonData.items,
          {
            id: newId,
            name: newFileName,
            isFolder: true,
            items: [],
          },
        ],
      })
    } else {
      setJsonData([
        ...data,
        { id: newId, name: newFileName, isFolder: true, items: [] },
      ])
    }
    setNewFileName('')
  }

  const handleBackPress = () => {
    if (currentTreeJsonData?.id) {
      let parent = findParentById(data, currentTreeJsonData.id)
      setCurrentTreeJsonData(parent)
    }
  }

  const renderJsonData = () => {
    if (currentTreeJsonData) {
      return currentTreeJsonData.items.map((el) => (
        <DashboardFile
          fileData={el}
          initialData={data}
          data={(el as Item).items}
          key={(el as Item).id}
          setJsonData={setJsonData}
          currentTreeJsonData={currentTreeJsonData}
          setCurrentTreeJsonData={setCurrentTreeJsonData}
        />
      ))
    } else {
      return data?.map((el) => (
        <DashboardFile
          fileData={el}
          initialData={data}
          data={data}
          key={el.id}
          setJsonData={setJsonData}
          currentTreeJsonData={currentTreeJsonData}
          setCurrentTreeJsonData={setCurrentTreeJsonData}
        />
      ))
    }
  }

  return (
    <div>
      <S.DashboardContentHeader>
        <dialog>
          {dialogInfo && <p>This name already exists</p>}
          <p>Type Name</p>
          <input
            type='text'
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <button
            onClick={() => {
              let allNamesArr = findAllValuesByKey(data, 'name')
              setDialogInfo(false)
              if (!allNamesArr.includes(newFileName) && dialog) {
                isFile ? handleAddFile() : handleAddFolder()
                dialog.close()
              } else {
                setDialogInfo(true)
              }
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              if (dialog) {
                dialog.close()
                setDialogInfo(false)
                setNewFileName('')
              }
            }}
          >
            CLOSE
          </button>
        </dialog>
        {data && (
          <div>
            <BackArrowIcon onClick={handleBackPress} />
          </div>
        )}

        {data && (
          <>
            <AddFolderIcon
              onClick={() => {
                dialog && dialog.showModal()
              }}
            />
            <AddFileIcon
              onClick={() => {
                setIsFile(true)
                dialog && dialog.showModal()
              }}
            />
            <DownloadFileIcon onClick={() => downloadJson(data)} />
          </>
        )}
      </S.DashboardContentHeader>

      <S.DashboardContent>{renderJsonData()}</S.DashboardContent>
    </div>
  )
}

export default DashboardContent
