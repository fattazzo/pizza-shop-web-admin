cd "$(dirname "$(readlink -f "$0")")"
json-server db.js --routes routes.json --host 0.0.0.0
