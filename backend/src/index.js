const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { decryptSave } = require("./saveDecryptor");
const { readRoster, dumpStrings, calibrateLevelOffset } = require("./saveRoster");

const app = express();
const upload = multer();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    message: "Gaming Companion Backend funcionando",
  });
});

function parseBraceArray(str) {
  return str
    .replace(/[{}]/g, "")
    .split("|")
    .map((s) => parseInt(s.trim(), 10));
}

app.post("/api/save/upload", upload.single("saveFile"), (req, res) => {
  try {
    const decrypted = decryptSave(req.file.buffer);

    const nullIndex = decrypted.indexOf(0);
    const headerText = decrypted.toString("ascii", 0, nullIndex);
    const normalized = headerText.replace(/\{[^}]*\}/g, (match) =>
      match.replace(/,/g, "|")
    );
    const fields = normalized.split(",").map((f) => f.trim());

    const roster = readRoster(decrypted);
    const partyLevels = parseBraceArray(fields[9]);
    const currentParty = roster.slice(0, partyLevels.length);

    const saveInfo = {
      playerName: fields[4],
      playTimeSeconds: parseFloat(fields[5]),
      saveDate: {
        year: fields[11],
        month: fields[12],
        day: fields[13],
        hour: fields[14],
        minute: fields[15],
      },
      capturedCount: roster.length,
      lastCaptured: roster[roster.length - 1]?.name ?? null,
      currentParty: currentParty.map((d) => ({
        name: d.name,
        level: d.level,
        dbId: d.dbId,
      })),
    };

    res.json({ ok: true, saveInfo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/digimon/:name", async (req, res) => {
  try {
    const response = await fetch(`https://digi-api.com/api/v1/digimon/${req.params.name}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Digimon não encontrado" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000");
});
