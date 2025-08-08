const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const targets = [
  "https://converttopixel-esnq.onrender.com",
  "https://server-pinger2.onrender.com", // Server B
  "https://discordbot-abo4.onrender.com",
  "https://vadrifts-key-system.onrender.com",
];

let currentTargetIndex = 0;
let isRunning = false;
let stats = {
  totalPings: 0,
  successfulPings: 0,
  failedPings: 0,
  uptime: Date.now()
};

async function pingTarget(url) {
  try {
    const startTime = Date.now();
    const res = await axios.get(url, { 
      timeout: 10000,
      headers: { 'User-Agent': 'RenderKeepAlive/1.0' }
    });
    const responseTime = Date.now() - startTime;
    
    stats.totalPings++;
    stats.successfulPings++;
    console.log(`[✅] Pinged ${url} | Status: ${res.status} | ${responseTime}ms`);
    return true;
  } catch (err) {
    stats.totalPings++;
    stats.failedPings++;
    console.log(`[❌] Failed to ping ${url} | ${err.message}`);
    return false;
  }
}

function startPinging() {
  if (isRunning) return;
  isRunning = true;
  
  console.log("🚀 Starting ping cycle...");
  
  setInterval(async () => {
    const url = targets[currentTargetIndex];
    await pingTarget(url);
    
    currentTargetIndex = (currentTargetIndex + 1) % targets.length;
  }, 25000);
}

app.get("/", (req, res) => {
  res.json({
    status: "✅ Server A - Render Ping Server is running",
    uptime: Math.floor((Date.now() - stats.uptime) / 1000),
    stats: stats,
    targets: targets.length,
    isActive: isRunning
  });
});

app.get("/ping", (req, res) => {
  res.json({
    status: "pong",
    timestamp: Date.now(),
    server: "A"
  });
});


app.get("/stats", (req, res) => {
  res.json({
    ...stats,
    uptime: Math.floor((Date.now() - stats.uptime) / 1000),
    successRate: stats.totalPings > 0 ? ((stats.successfulPings / stats.totalPings) * 100).toFixed(2) + '%' : '0%'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server A running on port ${PORT}`);
  console.log(`📊 Monitoring ${targets.length} targets`);
  
  setTimeout(startPinging, 5000);
});
