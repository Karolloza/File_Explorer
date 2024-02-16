import { useState } from "react";
import styled from "styled-components";
import StyledButton from "../components/StyledButton";
import { Item } from "../types";

const S = {
  Dashboard: styled.div``,
};

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<Item[] | null>(null);
  console.log("jsonData", jsonData);
  return (
    <S.Dashboard>
      <StyledButton text="Import file" setJsonData={setJsonData} />
    </S.Dashboard>
  );
};

export default Dashboard;
