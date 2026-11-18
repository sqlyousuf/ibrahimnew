import fitz, sys
src_path, out_dir = sys.argv[1], sys.argv[2]
src = fitz.open(src_path); sp = src[0]
NAVY = (0.038986802101135254, 0.08198672533035278, 0.27798885107040405)
# Union of the white artwork (everything except the navy background rect).
art = fitz.Rect()
for d in sp.get_drawings():
    if d.get("fill") and d["fill"][0] > 0.9:
        art |= d["rect"]
W, H = 23 * 72, 32 * 72           # trim size in points
def build(bleed, name):
    out = fitz.open()
    pw, ph = W + 2 * bleed, H + 2 * bleed
    page = out.new_page(width=pw, height=ph)
    page.draw_rect(page.rect, color=None, fill=NAVY, overlay=True)
    # Artwork 80% of the trim width, centred on the trim area.
    s = (W * 0.80) / art.width
    if art.height * s > H * 0.86: s = (H * 0.86) / art.height
    cx, cy = pw / 2, ph / 2
    ax, ay = (art.x0 + art.x1) / 2, (art.y0 + art.y1) / 2
    r = sp.rect
    target = fitz.Rect(cx + (r.x0 - ax) * s, cy + (r.y0 - ay) * s,
                       cx + (r.x1 - ax) * s, cy + (r.y1 - ay) * s)
    page.show_pdf_page(target, src, 0, keep_proportion=False)
    if bleed:
        page.set_trimbox(fitz.Rect(bleed, bleed, bleed + W, bleed + H))
    out.set_metadata({"title": "Masjid Ibrahim logo sticker 23 x 32 in", "creator": "Masjid Ibrahim"})
    out.save(f"{out_dir}/{name}", garbage=4, deflate=True)
    page.get_pixmap(dpi=20).save(f"{name}.png")
    print(name, round(pw/72,3), "x", round(ph/72,3), "in; artwork", round(art.width*s/72,1), "x", round(art.height*s/72,1), "in")
build(0, "logo-sticker-23x32in.pdf")
build(9, "logo-sticker-23x32in-with-bleed.pdf")   # 0.125in bleed each side
