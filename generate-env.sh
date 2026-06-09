#!/bin/sh

# Cria ou sobrescreve o arquivo env.js na pasta pública do Nginx
cat <<EOF > /usr/share/nginx/html/browser/env.js
window.env = {
    apiUrl: "${API_URL}"
};
EOF

exec nginx -g "daemon off;"