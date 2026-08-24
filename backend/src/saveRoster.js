const STRIDE = 0x150; // 336 bytes por Digimon
const PARTY_BOX_START = 0x001000;
const PARTY_BOX_END = 0x009000;

function isPrintableAscii(buf) {
  return [...buf].every(b => b >= 0x20 && b <= 0x7e);
}

function findEntryBase(decrypted) {
  for (let base = PARTY_BOX_START; base < PARTY_BOX_START + STRIDE; base += 4) {
    const nameOffset = base + 4;
    const nameEnd = decrypted.indexOf(0, nameOffset);
    if (nameEnd <= nameOffset || nameEnd - nameOffset > 32) continue;

    const nameBytes = decrypted.subarray(nameOffset, nameEnd);
    if (nameBytes.length < 2 || !isPrintableAscii(nameBytes)) continue;

    const level = decrypted.readInt32LE(nameOffset + 0x60);
    if (level >= 1 && level <= 99) return base;
  }
  return null;
}

function readRoster(decrypted) {
  const base = findEntryBase(decrypted);
  if (base === null) return [];

  const entries = [];
  for (let off = base; off < PARTY_BOX_END; off += STRIDE) {
    const nameOffset = off + 4;
    const active = decrypted.readUInt32LE(nameOffset + 0x140);
    if (active !== 1) break;

    const nameEnd = decrypted.indexOf(0, nameOffset);
    const name = decrypted.toString("ascii", nameOffset, nameEnd);
    const dbId = decrypted.readUInt32LE(off);

    entries.push({ name, dbId });
  }

  return entries;
}

function dumpStrings(buffer, start, end, minLength = 3) {
  const found = [];
  let currentStart = null;

  for (let i = start; i < end; i++) {
    const isPrintable = buffer[i] >= 0x20 && buffer[i] <= 0x7e;

    if (isPrintable) {
      if (currentStart === null) currentStart = i;
    } else {
      if (currentStart !== null && i - currentStart >= minLength) {
        found.push({
          offset: "0x" + currentStart.toString(16),
          text: buffer.toString("ascii", currentStart, i),
        });
      }
      currentStart = null;
    }
  }

  return found;
}

module.exports = { readRoster, dumpStrings };