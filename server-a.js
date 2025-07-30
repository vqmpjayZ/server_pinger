const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const targets = [
  "https://converttopixel-esnq.onrender.com",
  "https://59955d91-8de9-4508-9086-50d814b6421d-00-23am6j7qehoyy.kirk.replit.dev/",
  // "",
];

function startPinging() {
  for (const url of targets) {
    setInterval(async () => {
      try {
        const res = await axios.get(url);
        console.log(`[+] Pinged ${url} | Status: ${res.status}`);
      } catch (err) {
        console.log(`[-] Failed to ping ${url} | ${err.message}`);
      }
    }, Math.floor(Math.random() * 30000) + 30000);
  }
}

app.get("/", (req, res) => {
  res.send("✅ Render Ping Server is running");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  startPinging();
});
