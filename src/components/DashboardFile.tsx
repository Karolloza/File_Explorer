import { useState } from "react";
import styled from "styled-components";
import {
  FileIcon,
  FolderEmptyIcon,
  FolderFilledIcon,
  EditIcon,
  RemoveIcon,
} from "./icons";
import { Item } from "../types";

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
  StyledEditIcon: styled(EditIcon)``,
};

interface DashboardFileProps {
  fileData: Item;
  data: Item[];
  setJsonData: (data: Item[]) => void;
}

const DashboardFile = ({ fileData, data, setJsonData }: DashboardFileProps) => {
  const [editFileName, setEditFileName] = useState(false);
  const [fileName, setFileName] = useState(fileData.name);

  const handleInputChange = (event: any) => {
    setFileName(event.target.value);
  };
  const findById = (items: Item[], id: string) =>
    items.find((item) => item.id === id);

  const handleInputSave = () => {
    const editedItem = findById(data, fileData.id);
    if (editedItem) {
      editedItem.name = fileName;
      const index = data.findIndex((object) => object.id === fileData.id);
      const newData = [...data];
      newData[index] = editedItem;
      setJsonData(newData);
    }

    setEditFileName(false);
  };

  const handleDelete = () => {
    const index = data.findIndex((object) => object.id === fileData.id);
    const newData = [...data];
    newData.splice(index, 1);
    setJsonData(newData);
  };

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
            type="text"
            value={fileName}
            onChange={handleInputChange}
          ></input>
          <button onClick={handleInputSave}>Save</button>
        </div>
      )}

      <S.DashboardFileActionsContainer>
        <div>
          <S.StyledEditIcon onClick={() => setEditFileName(true)} />
        </div>
        <div>
          <RemoveIcon onClick={() => handleDelete()} />
        </div>
      </S.DashboardFileActionsContainer>
    </S.DashboardFile>
  );
};

export default DashboardFile;
