from playwright.sync_api import sync_playwright
import asyncio
import urllib.parse

HEADLESS = True
MAX_RESULTS = 3
WAIT_TIMEOUT_MS = 20000

#pip install playwright
#playwright install chromium

#95% dessa parte é de autoria do chatgpt obrigado chatgpt eu seria nada sem vc
def buscar_zoom(termo):
    termo_q = urllib.parse.quote(termo)
    url = f"https://www.zoom.com.br/search?q={termo_q}"

    with sync_playwright() as p:
        browser = p.firefox.launch(headless=HEADLESS)
        #browser = p.chromium.launch(headless=HEADLESS)
        page = browser.new_page()
        page.set_extra_http_headers({
            "Accept-Language": "pt-BR,pt;q=0.9"
        })

        print("Acessando:", url)
        page.goto(url, wait_until="domcontentloaded", timeout=10000)

        selector = "a[data-testid='product-card'], div.productCard, li.product-card, article"
        try:
            page.wait_for_selector(selector, timeout=WAIT_TIMEOUT_MS)
            elems = page.query_selector_all(selector)[:MAX_RESULTS]
        except Exception:
            print("Nenhum produto carregou dentro do timeout.")
            browser.close()
            return [{"status": "Nenhum produto encontrado ou ocorreu erro de timeout"}]

        products = []
        for el in elems:
            title_elem = el.query_selector("[data-testid='product-title']") or el.query_selector("h2") or el.query_selector("h3") or el.query_selector("a[title]")
            title = title_elem.inner_text().strip() if title_elem else None

            price_elem = el.query_selector_all("[data-testid*='price'], .price, .product-price, .price-value")
            price = None
            for pc in price_elem:
                text = pc.inner_text().strip()
                if text and any(ch.isdigit() for ch in text):
                    price = text
                    break

            link_elem = el.query_selector("a[href]")
            link = link_elem.get_attribute("href") if link_elem else None
            if link and link.startswith("/"):
                link = "https://www.zoom.com.br" + link

            img_elem = el.query_selector("img")
            img_url = img_elem.get_attribute("src") if img_elem else None
            if img_url and img_url.startswith("/"):
                img_url = "https://www.zoom.com.br" + img_url

            products.append({
                "title": title,
                "price": price,
                "link": link,
                "image": img_url
            })

        browser.close()
    return products

if __name__ == "__main__":
    termo = input("Digite o termo de busca: ").strip()
    # termo = "notebook ryzen 5"
    itens = buscar_zoom(termo)
    if not itens:
        print("Nenhum item extraído (veja zoom_debug.html / zoom_debug.png para inspeção).")
    else:
        print("\n--- RESULTADOS ---\n")
        for i, it in enumerate(itens, 1):
            print(f"{i}. {it['title']}")
            print(f"   Preço: {it['price']}")
            print(f"   Link: {it['link']}")
            print(f"   Imagem: {it['image']}\n")

async def buscar_zoom_async(termo: str):
    return await asyncio.to_thread(buscar_zoom, termo)