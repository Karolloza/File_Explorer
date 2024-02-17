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
}

const DashboardContent = ({ data }: DashboardContentProps) => {
  const renderJsonData = () => {
    return data?.map((el) => <DashboardFile data={el} key={el.id} />);
  };
  return <S.DashboardContent>{renderJsonData()}</S.DashboardContent>;
};

export default DashboardContent;
