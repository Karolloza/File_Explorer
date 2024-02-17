import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import ImportDataButton from "../components/ImportDataButton";
import DashboardContent from "../components/DashboardContent";
import { AddFileIcon, AddFolderIcon } from "../components/icons";
// import { Item } from "../types";

const S = {
  Dashboard: styled.div``,
  DashboardActionSection: styled.div`
    display: flex;
    gap: 20px;
  `,
};

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<any>(null);

  const handleAddIcon = () => {
    setJsonData([
      ...jsonData,
      { id: uuidv4(), name: "customFileName", isFolder: false, items: null },
    ]);
  };

  const handleAddFolder = () => {
    setJsonData([
      ...jsonData,
      { id: uuidv4(), name: "customFolderName", isFolder: true, items: [] },
    ]);
  };
  return (
    <S.Dashboard>
      <S.DashboardActionSection>
        <ImportDataButton text="Import file" setJsonData={setJsonData} />
        {jsonData && (
          <>
            <AddFolderIcon onClick={handleAddFolder} />
            <AddFileIcon onClick={handleAddIcon} />
          </>
        )}
      </S.DashboardActionSection>
      <DashboardContent data={jsonData} setJsonData={setJsonData} />
    </S.Dashboard>
  );
};

export default Dashboard;
