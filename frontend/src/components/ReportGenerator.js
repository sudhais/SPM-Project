import React from "react";
import { Button } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable plugin

const ReportGenerator = () => {
  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("User Details Report", 10, 10);

    // Define table data and columns
    const tableData = [
      ["Date","Age","Type","Category","Name"],
      ["2023-09-01","12", "active","oop","Amal"],
      ["2023-08-29","11", "active","inheritence","Kamal"],
      ["2023-08-08","30", "inactive","oop","Nimal"],
      ["2023-09-01","12", "active","oop","Perera"],
      ["2023-09-01","12", "active","oop","Himasha"],
      ["2023-09-01","12", "active","oop","Saara"],
     
    ];

    // Define table columns
    const tableColumns = ["Name", "Age","Type","Category","Name"];

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 50, // Y-position where the table starts
    });

    // Return the jsPDF instance
    return doc;
  };

  const downloadPDF = () => {
    // Generate the PDF
    const pdf = generatePDF();

    // Trigger the download
    pdf.save("report.pdf");
  };

  return (
    <div>
      <Button type="primary" onClick={downloadPDF}>
        Download Report
      </Button>
    </div>
  );
};

export default ReportGenerator;
