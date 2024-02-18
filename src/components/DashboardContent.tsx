import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { Item } from "../types/index";
import DashboardFile from "./DashboardFile";
import { AddFileIcon, AddFolderIcon } from "../components/icons";
import { updateObjectById } from "../utils";
import { BackArrowIcon } from "./icons";

const S = {
  DashboardContent: styled.div`
    display: flex;
  `,
  DashboardContentHeader: styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
  `,
};

interface DashboardContentProps {
  data: Item[];
  setJsonData: (data: Item[]) => void;
  currentTreeJsonData: Item;
  setCurrentTreeJsonData: (data: Item) => void;
}

const DashboardContent = ({
  data,
  setJsonData,
  currentTreeJsonData,
  setCurrentTreeJsonData,
}: DashboardContentProps) => {
  const [folderPath, setFolderPath] = useState<string>(``);

  const handleAddFile = () => {
    let newId = uuidv4();

    if (currentTreeJsonData?.id) {
      setJsonData(
        updateObjectById(data, currentTreeJsonData.id, {
          ...currentTreeJsonData,
          items: [
            ...currentTreeJsonData.items,
            {
              id: newId,
              name: "customFileName",
              isFolder: false,
              items: [],
            },
          ],
        })
      );
      setCurrentTreeJsonData({
        ...currentTreeJsonData,
        items: [
          ...currentTreeJsonData.items,
          {
            id: newId,
            name: "customFileName",
            isFolder: false,
            items: [],
          },
        ],
      });
    } else {
      setJsonData([
        ...data,
        { id: uuidv4(), name: "customFilerName", isFolder: false, items: [] },
      ]);
    }
  };

  const handleAddFolder = () => {
    let newId = uuidv4();

    if (currentTreeJsonData?.id) {
      setJsonData(
        updateObjectById(data, currentTreeJsonData.id, {
          ...currentTreeJsonData,
          items: [
            ...currentTreeJsonData.items,
            {
              id: newId,
              name: "customFolderName",
              isFolder: true,
              items: [],
            },
          ],
        })
      );
      setCurrentTreeJsonData({
        ...currentTreeJsonData,
        items: [
          ...currentTreeJsonData.items,
          {
            id: newId,
            name: "customFolderName",
            isFolder: true,
            items: [],
          },
        ],
      });
    } else {
      setJsonData([
        ...data,
        { id: newId, name: "customFolderName", isFolder: true, items: [] },
      ]);
    }
  };

  const renderJsonData = () => {
    if (currentTreeJsonData) {
      return currentTreeJsonData.items.map((el) => (
        <DashboardFile
          fileData={el}
          initialData={data}
          data={(el as Item).items}
          key={(el as Item).id}
          setJsonData={setJsonData}
          setFolderPath={setFolderPath}
          currentTreeJsonData={currentTreeJsonData}
          setCurrentTreeJsonData={setCurrentTreeJsonData}
        />
      ));
    } else {
      return data?.map((el) => (
        <DashboardFile
          fileData={el}
          initialData={data}
          data={data}
          key={el.id}
          setJsonData={setJsonData}
          setFolderPath={setFolderPath}
          currentTreeJsonData={currentTreeJsonData}
          setCurrentTreeJsonData={setCurrentTreeJsonData}
        />
      ));
    }
  };
  return (
    <div>
      <S.DashboardContentHeader>
        <div>
          <BackArrowIcon onClick={() => console.log("go back")} />
        </div>
        <div>Current path: {folderPath}</div>
        {data && (
          <>
            <AddFolderIcon onClick={handleAddFolder} />
            <AddFileIcon onClick={handleAddFile} />
          </>
        )}
      </S.DashboardContentHeader>
      <S.DashboardContent>{renderJsonData()}</S.DashboardContent>
    </div>
  );
};

export default DashboardContent;
