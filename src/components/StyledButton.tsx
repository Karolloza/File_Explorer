import styled from "styled-components";
import { Item } from "../types";

const S = {};

interface StyledButtonProps {
  text: string;
  setJsonData: (data: Item[] | null) => void;
}

const StyledButton = ({ text, setJsonData }: StyledButtonProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        try {
          const data = JSON.parse(text);
          setJsonData(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    reader.readAsText(files[0]);
  };

  return (
    <input
      type="file"
      accept=".json, .tsx"
      name={text}
      onChange={handleFileChange}
      multiple
    />
  );
};
export default StyledButton;
