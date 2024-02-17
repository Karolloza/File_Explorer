import styled from "styled-components";
import { Item } from "../types/index";
import DashboardFile from "./DashboardFile";
import { FileIcon, FolderEmptyIcon, FolderFilledIcon } from "./icons";

const S = {
  DashboardContent: styled.div`
    display: flex;
  `,
};

interface DashboardContentProps {
  data: Item[] | null;
  setJsonData: (data: Item[]) => void;
}

const DashboardContent = ({ data, setJsonData }: DashboardContentProps) => {
  const renderJsonData = () => {
    return data?.map((el) => (
      <DashboardFile
        fileData={el}
        data={data}
        key={el.id}
        setJsonData={setJsonData}
      />
    ));
  };
  return <S.DashboardContent>{renderJsonData()}</S.DashboardContent>;
};

export default DashboardContent;
