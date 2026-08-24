const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { decryptSave } = require("./saveDecryptor");
const { readRoster, dumpStrings } = require("./saveRoster");

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

app.post("/api/save/upload", upload.single("saveFile"), (req, res) => {
  console.log(
    "Upload recebido, arquivo:",
    req.file?.originalname,
    req.file?.size,
  );
  try {
    const decrypted = decryptSave(req.file.buffer);
    const strings = dumpStrings(decrypted, 0x001000, 0x009000);
    const nullIndex = decrypted.indexOf(0);
    const headerText = decrypted.toString("ascii", 0, nullIndex);
    const normalized = headerText.replace(/\{[^}]*\}/g, (match) => match.replace(/,/g, "|"));
    const fields = normalized.split(",").map(f => f.trim());

    const roster = readRoster(decrypted);

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
    };

    console.log(saveInfo);
    console.log(roster);
    console.log(strings);
    res.json({ ok: true, saveInfo, roster });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000");
});
