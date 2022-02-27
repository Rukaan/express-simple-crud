# Partner & Customer Service

## Getting started

Install dependencies run:
```
npm install
```

Copy all environment variables to .env file and modify as your need
```
cp .env.example .env
```

Run db migration

```
sequelize db:migrate
```

Then, start the application by running:
```
source .env
tsc
npm run dev
```

OR if you want to watch changes from tsc run:
```
tsc -w
AND
source .env && nodemon dist/main.js
```
in separate terminal