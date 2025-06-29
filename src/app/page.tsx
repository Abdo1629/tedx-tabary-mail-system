"use client";

import { useState } from "react";

export default function EmailSender() {
  const [manualEmail, setManualEmail] = useState("");
  const [sheetName, setSheetName] = useState("Sheet1");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    setStatus("🚀 Sending...");
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyVD1sku28Yr2j1u_QzCZ1sIe7iW58rRyb1Q_KzCUwNjRCc7wZEZqeUp10IpY3GaGgr0Q/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sheet: sheetName,
            email: manualEmail || null,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setStatus(`✅ Sent ${data.sent} email(s) successfully!`);
      } else {
        setStatus("❌ Failed to send emails.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error occurred while sending.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-xl rounded-2xl mt-10 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-black">📧 TEDx Email Sender</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-black">📄 Sheet Name</label>
        <input
          type="text"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-black">
          🎯 Specific Email (optional)
        </label>
        <input
          type="email"
          placeholder="someone@example.com"
          value={manualEmail}
          onChange={(e) => setManualEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <button
        onClick={handleSend}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
      >
        Send Email(s)
      </button>

      {status && <p className="mt-4 text-gray-700 text-center text-lg">{status}</p>}
    </div>
  );
}