const crypto = require("crypto");

const SAVE_AES_KEY = Buffer.from("33393632373736373534353535383833", "hex");
const SAVE_FILE_SIZE = 3098176;

function decryptSave(encryptedBuffer) {
  if (encryptedBuffer.length !== SAVE_FILE_SIZE) {
    throw new Error(
      `Tamanho inesperado: ${encryptedBuffer.length} bytes (esperado ${SAVE_FILE_SIZE})`
    );
  }

  const decipher = crypto.createDecipheriv("aes-128-ecb", SAVE_AES_KEY, null);
  decipher.setAutoPadding(false); // importante! explico embaixo
  return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
}

module.exports = { decryptSave };