const STRIDE = 0x150; // 336 bytes por Digimon
const PARTY_BOX_START = 0x001000;
const PARTY_BOX_END = 0x009000;

function isPrintableAscii(buf) {
  return [...buf].every(b => b >= 0x20 && b <= 0x7e);
}

function looksLikeNameAt(decrypted, nameOffset) {
  const nameEnd = decrypted.indexOf(0, nameOffset);
  if (nameEnd <= nameOffset || nameEnd - nameOffset < 2 || nameEnd - nameOffset > 32) return false;
  return isPrintableAscii(decrypted.subarray(nameOffset, nameEnd));
}

function findEntryBase(decrypted) {
  for (let candidate = PARTY_BOX_START; candidate < PARTY_BOX_END; candidate += 4) {
    const nameOffset = candidate + 4;
    if (!looksLikeNameAt(decrypted, nameOffset)) continue;
    if (!looksLikeNameAt(decrypted, nameOffset + STRIDE)) continue;
    return candidate; 
  }
  return null;
}

function readRoster(decrypted) {
  const base = findEntryBase(decrypted);
  if (base === null) return [];

  const entries = [];
  for (let off = base; off < PARTY_BOX_END; off += STRIDE) {
    const nameOffset = off + 4;
    if (!looksLikeNameAt(decrypted, nameOffset)) break;

    const nameEnd = decrypted.indexOf(0, nameOffset);
    const name = decrypted.toString("ascii", nameOffset, nameEnd);
    const dbId = decrypted.readUInt32LE(off);
    const level = decrypted.readInt32LE(nameOffset + 0x60);

    entries.push({ name, dbId, level, entryOffset: off });
  }

  return entries;
}

function calibrateLevelOffset(decrypted, entries) {
  for (let offset = -0x10; offset < STRIDE; offset += 4) {
    const levels = entries.map(e => decrypted.readInt32LE(e.entryOffset + 4 + offset));
    const allPlausible = levels.every(l => l >= 1 && l <= 99);
    if (allPlausible) {
      console.log(`offset 0x${offset.toString(16)} ->`, levels);
    }
  }
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

module.exports = { readRoster, dumpStrings, calibrateLevelOffset };