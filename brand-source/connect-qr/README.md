# Connect QR code

The printed QR code opens https://masjidibrahimspring.org/connect
(`src/app/connect/page.tsx`). Change links on that page, never the QR code:
anything already printed keeps working.

Published files (served from `/brand/`, downloadable on the /brand page):

- `public/brand/connect-qr-a4.pdf` — A4 print sheet with a white margin, for
  office/home printers (they can't print to the paper's edge)
- `public/brand/connect-qr-a4-full-bleed.pdf` — edge-to-edge version for a
  print shop (render `a4-sheet.html?bleed`)
- `public/brand/connect-qr.svg` — QR code only, vector (any size)
- `public/brand/connect-qr.png` — QR code only, 2400 px

To regenerate:

```sh
npm i qrcode@1.5.4            # in a scratch folder
node generate-qr.js ../../public/brand   # writes the SVG/PNG + qr-inline.svg
# paste qr-inline.svg into a4-sheet.html's .qrbox, then:
chrome --headless=new --no-pdf-header-footer --print-to-pdf=connect-qr-a4.pdf a4-sheet.html
```
