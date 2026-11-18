const QR = require("qrcode");
const fs = require("fs");
const url = "https://masjidibrahimspring.org/connect";
const out = process.argv[2];
const opts = { errorCorrectionLevel: "M", margin: 2, color: { dark: "#0b1648", light: "#ffffff" } };
(async () => {
  fs.writeFileSync(`${out}/connect-qr.svg`, await QR.toString(url, { ...opts, type: "svg" }));
  await QR.toFile(`${out}/connect-qr.png`, url, { ...opts, width: 2400 });
  // Bare module SVG (no quiet zone) for the A4 sheet.
  fs.writeFileSync("qr-inline.svg", await QR.toString(url, { ...opts, margin: 0, type: "svg" }));
  console.log("ok");
})();
