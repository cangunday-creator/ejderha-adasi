from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import webbrowser

if __name__ == "__main__":
    web_dir = os.path.join(os.path.dirname(__file__), "web")
    os.chdir(web_dir)
    port = 8000
    url = f"http://127.0.0.1:{port}"
    print(f"Web sunucusu başlatılıyor: {url}")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    HTTPServer(("0.0.0.0", port), SimpleHTTPRequestHandler).serve_forever()
