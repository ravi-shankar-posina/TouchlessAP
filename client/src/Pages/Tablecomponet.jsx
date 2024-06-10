//touchless ap
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Spin, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import { server } from "../constants";
import * as XLSX from "xlsx";
import axios from "axios";
const Tablecomponet = () => {
  const [loading, setLoading] = useState(false);
  const [poData, setPoData] = useState([]);
  const [tempValue, setTempValue] = useState("");
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = (key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item });
      setData(newData);
      setEditingKey("");
    }
  };

  const handleChange = (value, key, column) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [column]: value });
      setData(newData);
    }
  };

  const handleSave = () => {
    message.success("Posted successfully");
    setEditingKey("");
    // Implement your save logic here
  };

  const handleCancel = () => {
    setTempValue("");
    setEditingKey("");
    // Implement your cancel logic here
  };

  const EditableCell = ({ editable, value, onChange }) => {
    return editable ? (
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </div>
    );
  };

  const columns2 = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
    },
    {
      title: "Item",
      dataIndex: "Item",
      key: "Item",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <EditableCell
          editable={isEditing(record)}
          value={text}
          onChange={(value) => {
            setTempValue(value);
            handleChange(value, record.key, "price");
          }}
        />
      ),
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (text, record) => (
        <EditableCell
          editable={isEditing(record)}
          value={text}
          onChange={(value) => {
            setTempValue(value);
            handleChange(value, record.key, "Amount");
          }}
        />
      ),
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>, // Render the status
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={handleSave} type="link">
              Save
            </Button>
            <Button onClick={handleCancel} type="link">
              Cancel
            </Button>
          </span>
        ) : (
          <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
      width: 200,
    },
  ];
  const sucessColumns = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
    },
    {
      title: "Item",
      dataIndex: "Item",
      key: "Item",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const xlData = [
    {
      poNum: "3165354054",
      Item: 1,
      Material: "3BSE078762R1",
      qty: 2,
      price: 78.29,
      Amount: 156.58,
      key: 1,
    },
    {
      poNum: "3165354054",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 10,
      price: 84.35,
      Amount: 843.5,
      key: 2,
    },
    {
      poNum: "3165354054",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 7,
      price: 82.25,
      Amount: 575.75,
      key: 3,
    },
    {
      poNum: "3165354054",
      Item: 4,
      Material: "3BSE070125R1",
      qty: 7,
      price: 54.3,
      Amount: 380.09999999999997,
      key: 4,
    },
    {
      poNum: "3165354054",
      Item: 5,
      Material: "3BSE070126R1",
      qty: 3,
      price: 66.88,
      Amount: 200.64,
      key: 5,
    },
    {
      poNum: "3165354058",
      Item: 1,
      Material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      Amount: 411.25,
      key: 6,
    },
    {
      poNum: "3165354058",
      Item: 2,
      Material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      Amount: 271.5,
      key: 7,
    },
    {
      poNum: "3165354058",
      Item: 3,
      Material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      Amount: 334.4,
      key: 8,
    },
    {
      poNum: "3165354062",
      Item: 1,
      Material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      Amount: 411.25,
      key: 9,
    },
    {
      poNum: "3165354060",
      Item: 10,
      Material: "3BSE078762R1",
      qty: 5,
      price: 78.29,
      Amount: 391.45000000000005,
      key: 10,
    },
    {
      poNum: "3165354060",
      Item: 20,
      Material: "3BSE070093R1",
      qty: 15,
      price: 84.35,
      Amount: 1265.25,
      key: 11,
    },
    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      qty: 10,
      price: 82.25,
      Amount: 822.5,
      key: 12,
    },
    {
      poNum: "3165354060",
      Item: 40,
      Material: "3BSE070125R1",
      qty: 8,
      price: 54.3,
      Amount: 434.4,
      key: 13,
    },
    {
      poNum: "3165354060",
      Item: 50,
      Material: "3BSE070126R1",
      qty: 9,
      price: 66.88,
      Amount: 601.92,
      key: 14,
    },
    {
      poNum: "3165354060",
      Item: 60,
      Material: "3BSE070127R1",
      qty: 3,
      price: 73.2,
      Amount: 219.60000000000002,
      key: 15,
    },
    {
      poNum: "3165354060",
      Item: 70,
      Material: "3BSE070134R1",
      qty: 4,
      price: 78.1,
      Amount: 312.4,
      key: 16,
    },
    {
      poNum: "3165354060",
      Item: 80,
      Material: "3BSE070135R1",
      qty: 5,
      price: 87.88,
      Amount: 439.4,
      key: 17,
    },
    {
      poNum: "3165354060",
      Item: 90,
      Material: "3BSE070142R1",
      qty: 11,
      price: 33,
      Amount: 363,
      key: 18,
    },
    {
      poNum: "3165354060",
      Item: 100,
      Material: "3BSE070214-EN",
      qty: 5,
      price: 112.34,
      Amount: 561.7,
      key: 19,
    },
    {
      poNum: "3165354060",
      Item: 110,
      Material: "3BSE070544",
      qty: 5,
      price: 101.1,
      Amount: 505.5,
      key: 20,
    },
    {
      poNum: "3165354056",
      Item: 1,
      Material: "3BSE070126R1",
      qty: 10,
      price: 66.88,
      Amount: 668.8,
      key: 21,
    },
    {
      poNum: "3165354056",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 5,
      price: 84.35,
      Amount: 421.75,
      key: 22,
    },
    {
      poNum: "3165354056",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 2,
      price: 82.25,
      Amount: 164.5,
      key: 23,
    },
  ];
  const pdfData = [
    {
      poNum: "3165354054",
      Item: 1,
      Material: "3BSE078762R1",
      "Cust Material": "RN078762R1",
      Description: "AIS810 Analog Input 4 to 20mA",
      qty: 2,
      price: 78.29,
      Amount: 156.58,
      key: 1,
      status: "Successfully Process",
    },
    {
      poNum: "3165354054",
      Item: 2,
      Material: "3BSE070093R1",
      "Cust Material": "RN070093R1",
      Description: "PFPC203-A Cylmate Transducer Bus",
      qty: 10,
      price: 84.35,
      Amount: 843.5,
      key: 2,
      status: "Successfully Process",
    },

    {
      poNum: "3165354054",
      Item: 3,
      Material: "3BSE070124R1",
      "Cust Material": "RN070124R1",
      Description: "EOW-x2 workplace",
      qty: 7,
      price: 82.25,
      Amount: 575.75,
      key: 3,
      status: "Successfully Process",
    },
    {
      poNum: "3165354054",
      Item: 4,
      Material: "3BSE070125R1",
      "Cust Material": "RN070125R1",
      Description: "EOW-x3 workplace",
      qty: 7,
      price: 54.3,
      Amount: 380.1,
      key: 4,
      status: "Successfully Process",
    },
    {
      poNum: "3165354054",
      Item: 5,
      Material: "3BSE070126R1",
      "Cust Material": "RN070126R1",
      Description: "EOW-f2 workplace",
      qty: 3,
      price: 66.88,
      Amount: 200.64,
      key: 5,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 10,
      Material: "3BSE078762R1",
      DESCRIPTION: "AIS810 Analog Input 4 to 20mA",
      Material: "3BSE078762",
      qty: 5,
      price: 78.29,
      Amount: 391.45,
      key: 6,
      status: "Successfully Process",
    },

    {
      poNum: "3165354060",
      Item: 20,
      Material: "3BSE070093R1",
      qty: 15,
      price: 84.35,
      Amount: 1265.25,
      key: 8,
      status: "Successfully Process",
    },

    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      DESCRIPTION: "EOW-x2 workplace",
      Material: "3BSE070124",
      qty: 10,
      price: 82.25,
      Amount: 847.175,
      key: 10,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 40,
      Material: "3BSE070125R1",
      DESCRIPTION: "EOW-x3 workplace",
      Material: "3BSE070125",
      qty: 8,
      price: 54.3,
      Amount: 434.4,
      key: 11,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 50,
      Material: "3BSE070126R1",
      DESCRIPTION: "EOW-f2 workplace",
      Material: "3BSE070126",
      qty: 9,
      price: 66.88,
      Amount: 601.92,
      key: 12,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 60,
      Material: "3BSE070127R1",
      DESCRIPTION: "EOW-f3 workplace",
      Material: "3BSE070127",
      qty: 3,
      price: 73.2,
      Amount: 226.188,
      key: 13,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 70,
      Material: "3BSE070134R1",
      DESCRIPTION: "Video Input Channel",
      Material: "3BSE070134",
      qty: 4,
      price: 78.1,
      Amount: 312.4,
      key: 14,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 80,
      Material: "3BSE070135R1",
      DESCRIPTION: "Video Client",
      Material: "3BSE070135",
      qty: 5,
      price: 87.88,
      Amount: 439.4,
      key: 15,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 90,
      Material: "3BSE070142R1",
      DESCRIPTION: "Automation Sentinel Subscription",
      Material: "3BSE070142",
      qty: 11,
      price: 33,
      Amount: 363,
      key: 16,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 100,
      Material: "3BSE070214-EN",
      DESCRIPTION: "Panel 800 Version 6",
      Material: "3BSE070214-",
      qty: 5,
      price: 112.34,
      Amount: 561.7,
      key: 17,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 110,
      Material: "3BSE070544",
      DESCRIPTION: "System 800xA ADI Connect 5.1",
      Material: "3BSE070544",
      qty: 5,
      price: 101.1,
      Amount: 505.5,
      key: 18,
      status: "Successfully Process",
    },
    {
      poNum: "3165354058",
      Item: 10,
      Material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      Amount: "411.25",
      key: 19,
      status: "Successfully Process",
    },
    {
      poNum: "3165354058",
      Item: 20,
      Material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      Amount: "271.50",
      key: 20,
      status: "Successfully Process",
    },
    {
      poNum: "3165354058",
      Item: 30,
      Material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      Amount: "334.40",
      key: 21,
      status: "Successfully Process",
    },
  ];

  //   useEffect(() => {
  //     // Function to fetch PDF data from the API
  //     const fetchPdfData = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:3001/api/getPdfData",
  //           {
  //             poNum: poData, // Replace with the PO number you want to fetch
  //           }
  //         );
  //         setPdfData(response.data.data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching PDF data:", error);
  //         setLoading(false);
  //       }
  //     };
  //     fetchPdfData();
  //   }, [poNumber]);

  //   const [xlData, setXlData] = useState([]);
  console.log("xldata: ", xlData);
  //   const [pdfData, setPdfData] = useState([]);
  //   useEffect(() => {
  //     // Function to fetch PDF data from the API
  //     const fetchPdfData = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:3001/api/getPdfData",
  //           {
  //             poNum: "3165354054", // Replace with the PO number you want to fetch
  //           }
  //         );
  //         setPdfData(response.data.data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching PDF data:", error);
  //         setLoading(false);
  //       }
  //     };

  //     // Function to fetch XL data from the API
  //     // const fetchXlData = async () => {
  //     //   setLoading(true);
  //     //   try {
  //     //     const response = await axios.post(
  //     //       "http://localhost:3001/api/getXlData",
  //     //       {
  //     //         poNum: "3165354054", // Replace with the PO number you want to fetch
  //     //       }
  //     //     );
  //     //     setXlData(response.data.data);
  //     //     setLoading(false);
  //     //   } catch (error) {
  //     //     console.error("Error fetching XL data:", error);
  //     //     setLoading(false);
  //     //   }
  //     // };

  //     // Call both fetch functions when the component mounts
  //     fetchPdfData();
  //     // fetchXlData();
  //   }, []); // Empty dependency array ensures the effect runs only once

  const filterData = (poNumber) => {
    const verifyData = [];
    const successData = [];

    console.log("xlData:", xlData);
    console.log("pdfData:", pdfData);

    const filteredXlData = xlData.filter(
      (row) => String(row.poNum) === poNumber
    );
    const filteredPdfData = pdfData.filter(
      (row) => String(row.poNum) === poNumber
    );

    console.log("filteredXlData:", filteredXlData);
    console.log("filteredPdfData:", filteredPdfData);

    // Iterate through filtered XL data and compare with filtered PDF data
    filteredPdfData.forEach((row) => {
      const matchingRow = filteredXlData.find(
        (item) =>
          Math.floor(row.price) === Math.floor(item.price) &&
          Math.floor(row.Amount) === Math.floor(item.Amount)
      );

      if (!matchingRow) {
        // Add to verify table if no match is found
        verifyData.push({ ...row, status: "error: mismatch found" });
      } else {
        // Add to success table if a match is found
        successData.push({ ...row, status: "Successfully processed" });
      }
    });

    console.log("verifyData:", verifyData);
    console.log("successData:", successData);

    return { verifyData, successData };
  };
  const VerifyTable = ({ poNumber }) => {
    const { verifyData } = filterData(poNumber);
    return <Table dataSource={verifyData} columns={columns2} />;
  };

  const SuccessTable = ({ poNumber }) => {
    const { successData } = filterData(poNumber);
    return (
      <>
        {loading ? (
          <Spin
            size="small"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          /> // Display a loading spinner while data is being fetched
        ) : (
          <Table dataSource={successData} columns={sucessColumns} /> // Render the table once data is fetched
        )}
      </>
    );
  };
  const [activeTable, setActiveTable] = useState("success");

  const handleVerifyClick = () => {
    setActiveTable("verify");
  };

  const handleSuccessClick = () => {
    setActiveTable("success");
  };
  console.log("poData: ", poData);
  const handleProcessApi = () => {
    window.location.reload();
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace 'your-api-endpoint' with the actual endpoint of your API
        const response = await axios.get("http://localhost:3001/api/getPodata");
        const { poNumber } = response.data[0]; // Extract poNumber from the first element of the response data array
        setPoData(poNumber); // Set the selectedPoNumber state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [poData]);
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      {/* // <Table 
            // columns={columns}
            // dataSource={headerData}
            // pagination={{ pageSize: 8 }}
          // />*/}
      <Button style={{ width: 85 }} onClick={handleSuccessClick}>
        Success
      </Button>
      <Button
        style={{ width: 85, marginLeft: 10, marginBottom: 10 }}
        onClick={handleVerifyClick}
      >
        Verify
      </Button>
      <Button
        style={{ width: 85, marginLeft: 10, marginBottom: 10 }}
        onClick={handleProcessApi}
      >
        Pre-Process
      </Button>

      {activeTable === "success" && <SuccessTable poNumber={poData} />}
      {activeTable === "verify" && <VerifyTable poNumber={poData} />}
    </div>
  );
};

export default Tablecomponet;
