import json, os, re

cats = [
    "cables-usb-c", "cargadores-inalambricos", "cepillos-dentales-electricos",
    "memorias-ram", "mochilas", "powerbanks", "relojes-hombre", "sillas-gaming", "tiras-led"
]

for slug in cats:
    path = os.path.join("data", slug + ".json")
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    print("=== " + slug + " ===")
    for p in data.get("productos", []):
        url = p.get("affiliate_url", "")
        m = re.search(r"/dp/([A-Z0-9]{10})", url)
        asin = m.group(1) if m else "N/A"
        img_path = p.get("image", "NO")
        local = os.path.join("public", img_path.lstrip("/").replace("/", os.sep)) if img_path and img_path != "NO" else ""
        exists = os.path.exists(local) if local else False
        print("  pos" + str(p["position"]) + ": " + p["name"][:45] + " | " + asin + " | exists:" + str(exists))
    print("")
