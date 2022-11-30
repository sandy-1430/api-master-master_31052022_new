var aesjs = require("aes-js");
var Buffer = require("buffer/").Buffer;

export default class Encryption {
  constructor() {
    this.key = Buffer.from(process.env.REACT_APP_KEY);
  }
  #utf8ToBytes(data) {
    return aesjs.utils.utf8.toBytes(data);
  }

  #hexToBytes(hexData) {
    return aesjs.utils.hex.toBytes(hexData);
  }

  encrypt(data) {
    let DataBytes = this.#utf8ToBytes(data);

    var aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));

    var encryptedBytes = aesCtr.encrypt(DataBytes);

    // // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex + "";
  }

  decrypt(hexData) {
    var encryptedBytes = this.#hexToBytes(hexData);

    var aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  }
}
