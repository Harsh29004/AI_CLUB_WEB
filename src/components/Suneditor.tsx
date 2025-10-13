import React from "react";
import SunEditor, { buttonList } from "suneditor-react";

interface CustomSunEditorProps {
  onChange?: (content: string) => void;
  value?: string;
}

const CustomSunEditor: React.FC<CustomSunEditorProps> = ({ onChange, value }) => {
  return (
    <SunEditor 
      setOptions={{ buttonList: buttonList.complex }} 
      onChange={onChange}
      setContents={value || ""}
    />
  );
};

export default CustomSunEditor;
