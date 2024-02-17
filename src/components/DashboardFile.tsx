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
};

interface DashboardFileProps {
  data: Item;
}

const DashboardFile = ({ data }: DashboardFileProps) => {
  return (
    <S.DashboardFile>
      <div>
        {data.isFolder ? (
          data.items.length ? (
            <FolderFilledIcon />
          ) : (
            <FolderEmptyIcon />
          )
        ) : (
          <FileIcon />
        )}
      </div>
      <div>
        {data.name} {data.items && !data.items.length && "(empty)"}
      </div>
      <S.DashboardFileActionsContainer>
        <div>
          <EditIcon />
        </div>
        <div>
          <RemoveIcon />
        </div>
      </S.DashboardFileActionsContainer>
    </S.DashboardFile>
  );
};

export default DashboardFile;
