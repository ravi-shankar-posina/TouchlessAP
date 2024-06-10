import React, { useState } from "react";
import { usePO } from "./POContext";
import { Button, Input } from "antd";
import Layout from "../components/Layout";

const InputPage = () => {
  const [inputValue, setInputValue] = useState("");
  const { setPONumber } = usePO();
  const id = "6666bfc4eee7d1ee0e79c5c3";
  const handleSubmit = () => {
    // Send PUT request to backend API with the PO number in the URL path
    fetch(`http://localhost:3001/api/postPodata/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ poNumber: inputValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update PO number");
        }
        console.log("PO number updated:", inputValue);
        setPONumber(inputValue);
      })
      .catch((error) => console.error("Error updating PO number:", error));
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row", width: 400 }}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Layout>
  );
};

export default InputPage;
