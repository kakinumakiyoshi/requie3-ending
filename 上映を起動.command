#!/bin/bash
# REQUIEⅢ 上映：このフォルダの中身を、このPCの中だけで動かす（インターネットは使わない）
# ダブルクリックで起動 → Chrome で上映コントロールが開く。上映が終わるまでこのウィンドウは閉じない。
cd "$(dirname "$0")" || exit 1
PORT=8765
URL="http://localhost:$PORT/control.html"
if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 が見つかりません。ターミナルで「xcode-select --install」を実行してから、もう一度ダブルクリックしてください。"
  read -r -p "Enter で閉じます"; exit 1
fi
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "すでに起動しています。"
else
  python3 serve.py $PORT >/dev/null 2>&1 &
  SERVER=$!
  sleep 1
fi
if [ -d "/Applications/Google Chrome.app" ]; then open -a "Google Chrome" "$URL"; else open "$URL"; fi
echo ""
echo "  REQUIEⅢ 上映を起動しました：$URL"
echo "  このウィンドウは上映が終わるまで閉じないでください。"
echo "  終わったら、このウィンドウで Ctrl+C を押すか、ウィンドウを閉じてください。"
echo ""
[ -n "$SERVER" ] && wait "$SERVER"
