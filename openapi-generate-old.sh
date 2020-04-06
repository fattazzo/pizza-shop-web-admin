cd src/app/open-api

# rimuovo tutte le api precedentemente generate
rm -rf ..?* .[!.]* *

# scarico il nuovo swagger json
wget --quiet --no-check-certificate https://studio.apicur.io/download?type=api&format=json&id=24548 -O api.json

# genero il client
npx openapi-generator generate -i ../../../api.json -g typescript-angular

# rimuovo tutto quello che non serve
rm -f api.json
rm -f README.md
rm -f git_push.sh
rm -f .openapi-generator-ignore
rm -f .gitignore
rm -rf .openapi-generator
