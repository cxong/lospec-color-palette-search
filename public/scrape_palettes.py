import requests
import json
import time

BASE_URL = "https://lospec.com/palette-list/load"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/142.0.0.0 Safari/537.36"
    ),
    "Referer": "https://lospec.com/palette-list",
}

PARAMS_TEMPLATE = {
    "colorNumberFilterType": "any",
    "colorNumber": 8,
    "tag": "",
    "sortingType": "default",
}

OUTPUT_FILE = "palettes.json"
REQUEST_DELAY = 0.5  # seconds between requests


def fetch_all_palettes():
    all_palettes = {}
    page = 0
    total_count = None

    while True:
        params = PARAMS_TEMPLATE.copy()
        params["page"] = page

        print(f"Fetching page {page}...")
        response = requests.get(BASE_URL, headers=HEADERS, params=params)
        response.raise_for_status()

        data = response.json()

        if total_count is None:
            total_count = data.get("totalCount", 0)
            print(f"Total palettes reported: {total_count}")

        palettes = data.get("palettes", [])
        if not palettes:
            print("No more palettes found.")
            break

        for palette in palettes:
            palette_id = palette.get("_id")
            if palette_id:
                all_palettes[palette_id] = palette

        print(f"Collected {len(all_palettes)} palettes so far.")

        if len(all_palettes) >= total_count:
            break

        page += 1
        time.sleep(REQUEST_DELAY)

    return all_palettes


def main():
    palettes = fetch_all_palettes()

    print(f"Saving {len(palettes)} palettes to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(palettes, f, indent=2, ensure_ascii=False)

    print("Done!")


if __name__ == "__main__":
    main()
