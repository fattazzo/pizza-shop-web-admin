cd src/app/open-api

# rimuovo tutte le api precedentemente generate
rm -rf ..?* .[!.]* *

# scompatto il client generato da swagger-hub
unzip /tmp/typescript-angular-client-generated.zip

# rimuovo tutto quello che non serve
rm -f api.json
rm -f README.md
rm -f git_push.sh
rm -f .openapi-generator-ignore
rm -f .gitignore
rm -rf .openapi-generator
