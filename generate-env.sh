#!/bin/sh

# Cria a pasta assets
mkdir -p /usr/share/nginx/html/assets

# Cria ou sobrescreve o arquivo env.js
cat <<EOF > /usr/share/nginx/html/assets/env.js
window.env = {
  apiUrl: "${API_URL}"
};
EOF

# Inicia o Nginx
exec nginx -g "daemon off;"