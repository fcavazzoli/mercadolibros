FROM --platform=linux/amd64 node:20.14.0-alpine3.19

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY prisma ./prisma

RUN npm run prisma:generate 

COPY . .

CMD ["npm", "run", "start"]