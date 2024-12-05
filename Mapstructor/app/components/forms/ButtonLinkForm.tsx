import { useState } from "react";
import { ButtonLink } from "@/app/models/button-link.model";

type ButtonLinkFormProps = {
  onSubmit: (link: ButtonLink) => void;
  cancelCallback: () => void;
};

export default function ButtonLinkForm({ onSubmit, cancelCallback }: ButtonLinkFormProps) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const handleAddLink = () => {
    if (label && url) {
      const newLink: ButtonLink = {
        id: Date.now().toString(),
        label,
        url,
      };
      onSubmit(newLink);
      setLabel("");
      setUrl("");
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      {/* Input Fields */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Button Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            fontSize: "14px",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Button URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            fontSize: "14px",
          }}
        />
      </div>
        {/* Non-Clickable Preview Button */}
        <div
          style={{
            borderColor: "grey",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "5px 10px",
            marginTop: "10px",
            display: "inline-block",
            backgroundColor: "white",
            color: "#000",
            textAlign: "center",
          }}
        >
          {label || "Preview"}
        </div>
      <div style={{display: "flex", gap: "10px"}}>
        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddLink}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Button Link
        </button>
        <button
          type="button"
          onClick={cancelCallback}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#a40000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
