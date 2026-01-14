import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePdf";

const InvoiceForm = () => {
  // Initialize state with form fields
  const [formData, setFormData] = useState({
    nextOfKin: "",
    reference: "",
    deceasedName: "",
    invoiceNumber: "BTF9BB3252",
    dueDate: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate PDF and send via email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1. Generate PDF blob
      const blob = await pdf(<InvoicePDF invoiceData={formData} />).toBlob();

      // 2. Convert blob to base64 for email attachment
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

        // 3. Send to backend API
        const response = await fetch("http://localhost:4000/api/send-invoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            pdfAttachment: base64data,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage("Invoice sent successfully!");
          // Reset form if needed
          // setFormData({...initialState});
        } else {
          setMessage(`Error: ${result.error || "Failed to send invoice"}`);
        }
      };
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error generating or sending invoice");
    } finally {
      setLoading(false);
    }
  };

  // Preview PDF in new tab
  const handlePreview = async () => {
    const blob = await pdf(<InvoicePDF invoiceData={formData} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="invoice-container">
      <h1>Invoice Generator</h1>

      <form onSubmit={handleSubmit} className="invoice-form">
        <div className="form-group">
          <label>Next of Kin:</label>
          <input
            type="text"
            name="nextOfKin"
            value={formData.nextOfKin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Reference:</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Deceased Name:</label>
          <input
            type="text"
            name="deceasedName"
            value={formData.deceasedName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Invoice Number:</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Recipient Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={handlePreview} className="preview-btn">
            Preview PDF
          </button>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Sending..." : "Generate & Send Invoice"}
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <style jsx>{`
        .invoice-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }

        .invoice-form {
          background: #f9f9f9;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        .button-group {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .preview-btn {
          background: #6c757d;
          color: white;
        }

        .preview-btn:hover {
          background: #5a6268;
        }

        .submit-btn {
          background: #007bff;
          color: white;
        }

        .submit-btn:hover:not(:disabled) {
          background: #0056b3;
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .message {
          margin-top: 20px;
          padding: 15px;
          border-radius: 4px;
          text-align: center;
        }

        .success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default InvoiceForm;
