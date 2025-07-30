const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const targets = [
  "https://converttopixel-esnq.onrender.com",
  "https://59955d91-8de9-4508-9086-50d814b6421d-00-23am6j7qehoyy.kirk.replit.dev/",
  "https://7bf316d4-562e-4bed-b2bc-fbb94c805f2c-00-2k4z7h6j1re0i.worf.replit.dev/",
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
