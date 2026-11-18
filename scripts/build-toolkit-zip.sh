#!/usr/bin/env bash
# Rebuilds the one-click "Download everything" zip for /toolkit.
# Run after changing any file in public/downloads/toolkit/.
set -euo pipefail
cd "$(dirname "$0")/../public/downloads/toolkit"
rm -f 10-hours-back-system.zip
mkdir -p /tmp/gc-kit/"10 Hours Back System"/{PDF,Word,Excel}
cp *.pdf /tmp/gc-kit/"10 Hours Back System"/PDF/
cp *.docx /tmp/gc-kit/"10 Hours Back System"/Word/
cp *.xlsx /tmp/gc-kit/"10 Hours Back System"/Excel/
( cd /tmp/gc-kit && zip -qr -9 "$OLDPWD/10-hours-back-system.zip" "10 Hours Back System" )
rm -rf /tmp/gc-kit
ls -la 10-hours-back-system.zip
