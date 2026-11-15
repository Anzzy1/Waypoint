"""Render every .frame in poster.html to a PNG in marketing/out/.

Usage: python marketing/render.py
"""
import pathlib
from playwright.sync_api import sync_playwright

here = pathlib.Path(__file__).parent
out = here / "out"
out.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 2100, "height": 1200}, device_scale_factor=2)
    page.goto((here / "poster.html").as_uri(), wait_until="networkidle")
    page.evaluate("document.fonts.ready")
    page.evaluate("window.cropsReady")
    page.wait_for_timeout(500)
    for frame in page.query_selector_all(".frame"):
        name = frame.get_attribute("data-name")
        frame.screenshot(path=str(out / f"{name}.png"))
        print("wrote", name)
    browser.close()
