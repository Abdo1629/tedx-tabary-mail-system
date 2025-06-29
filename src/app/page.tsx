"use client";

import { useState } from "react";

export default function EmailSender() {
  const [manualEmail, setManualEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    setStatus("🚀 Sending...");
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyVD1sku28Yr2j1u_QzCZ1sIe7iW58rRyb1Q_KzCUwNjRCc7wZEZqeUp10IpY3GaGgr0Q/exec", // ← غيّر ده بالرابط الحقيقي بتاع Google Script
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sheet: "Sheet1", // شيت ثابت
            email: manualEmail || null, // لو فاضي هيبعت للكل
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
    <div className="p-6 max-w-md mx-auto shadow-lg rounded-2xl mt-12 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">
        📬 TEDx Email Broadcaster
      </h2>

      <label className="block mb-2 font-medium text-black">
        ✉️ Send to Specific Email (optional)
      </label>
      <input
        type="email"
        placeholder="someone@example.com"
        value={manualEmail}
        onChange={(e) => setManualEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />

      <button
        onClick={handleSend}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg w-full font-semibold"
      >
        Send Email
      </button>

      {status && (
        <p className="mt-4 text-center text-gray-700 font-medium">{status}</p>
      )}
    </div>
  );
}