#!/usr/bin/env python3
"""
Downloads missing product images for new categories.
Uses Amazon image CDN by ASIN, with fallback URLs.
Run: python3 scripts/download_images.py
"""
import json, os, re, time, urllib.request, urllib.error

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

CATS_NEED_IMAGES = [
    "cables-usb-c", "cargadores-inalambricos", "cepillos-dentales-electricos",
    "memorias-ram", "mochilas", "powerbanks", "relojes-hombre", "sillas-gaming", "tiras-led"
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9',
}

def get_asin(affiliate_url):
    m = re.search(r'/dp/([A-Z0-9]{10})', affiliate_url or '')
    return m.group(1) if m else None

def try_download(url, dest_path):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                content = resp.read()
                if len(content) > 5000:  # valid image (not error page)
                    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                    with open(dest_path, 'wb') as f:
                        f.write(content)
                    return True
    except Exception:
        pass
    return False

def download_image_for_product(asin, img_path):
    dest = os.path.join(PUBLIC_DIR, img_path.lstrip('/').replace('/', os.sep))
    if os.path.exists(dest):
        return True

    # Amazon CDN URL patterns to try
    urls = [
        f"https://m.media-amazon.com/images/P/{asin}.01._SCLZZZZZZZ_.jpg",
        f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.L.jpg",
        f"https://m.media-amazon.com/images/P/{asin}.01._AC_SX300_SY300_.jpg",
        f"https://m.media-amazon.com/images/P/{asin}.01._AC_SL1500_.jpg",
    ]

    for url in urls:
        if try_download(url, dest):
            print(f"    OK: {asin} -> {img_path}")
            return True
        time.sleep(0.3)

    print(f"    FAIL: {asin} (no image found)")
    return False

total_ok = 0
total_fail = 0
failed = []

for slug in CATS_NEED_IMAGES:
    path = os.path.join(DATA_DIR, slug + ".json")
    with open(path, encoding='utf-8') as f:
        data = json.load(f)

    print(f"\n=== {slug} ===")
    for p in data.get('productos', []):
        img_path = p.get('image', '')
        if not img_path:
            continue
        dest = os.path.join(PUBLIC_DIR, img_path.lstrip('/').replace('/', os.sep))
        if os.path.exists(dest):
            continue  # already exists

        asin = get_asin(p.get('affiliate_url', ''))
        if not asin:
            print(f"    NO ASIN: pos{p['position']}")
            total_fail += 1
            failed.append((slug, p['position'], 'no asin'))
            continue

        ok = download_image_for_product(asin, img_path)
        if ok:
            total_ok += 1
        else:
            total_fail += 1
            failed.append((slug, p['position'], asin))
        time.sleep(0.5)

print(f"\n\nSummary: {total_ok} downloaded, {total_fail} failed")
if failed:
    print("Failed:")
    for slug, pos, info in failed:
        print(f"  {slug} pos{pos}: {info}")
