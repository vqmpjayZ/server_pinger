const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const targets = [
  "https://converttopixel-esnq.onrender.com",
  "https://server-pinger2.onrender.com",
  "https://discordbot-abo4.onrender.com/",
  "https://vadrifts-key-system.onrender.com",
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
