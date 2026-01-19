import Editor from "@monaco-editor/react";
import {DemoCodes} from "../utils/utils"

export default function VSCodeIn({code,width}) {
 return (
    <div
      style={{
        width: `${width ? "62rem" : "500px"}`,
        height: "500px",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#1e1e1e",
        // boxShadow: "0 10px 30px rgba(255, 251, 251, 0.62)",
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px",
          background: "#2d2d2d",
          borderBottom: "1px solid #3c3c3c",
        }}
      >
        {/* MacOS window buttons */}
        <span style={{ width: 12, height: 12, background: "#ff5f56", borderRadius: "50%" }}></span>
        <span style={{ width: 12, height: 12, background: "#ffbd2e", borderRadius: "50%" }}></span>
        <span style={{ width: 12, height: 12, background: "#27c93f", borderRadius: "50%" }}></span>

        {/* File name */}
        <span style={{ color: "#ccc", marginLeft: "10px", fontSize: "14px" }}>
          Main.{ code > 0 ? DemoCodes[code].extension  : DemoCodes[0].extension}
        </span>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="100%"
        defaultLanguage={code > 0 ? DemoCodes[code].language  :  DemoCodes[0].language}
        defaultValue={ code > 0 ? DemoCodes[code].code  : DemoCodes[0].code}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          fontLigatures: true,
          readOnly:true,
          smoothScrolling: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
