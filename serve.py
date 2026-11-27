# REQUIEⅢ 上映：このフォルダを PC の中だけ（127.0.0.1）で配るサーバー。
# ブラウザに前の版を覚えさせない（Cache-Control: no-store）。上映を起動.command から使う。
import http.server, functools, os, sys
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()
    def log_message(self, *a):
        pass
os.chdir(os.path.dirname(os.path.abspath(__file__)))
http.server.ThreadingHTTPServer(("127.0.0.1", PORT), NoCache).serve_forever()
