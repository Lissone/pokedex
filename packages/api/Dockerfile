FROM node:18-alpine

ENV TZ=America/Sao_Paulo
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY package*.json ./

# --production=false para instalar tudo
RUN npm install --legacy-peer-deps --production=false

COPY . .

RUN npm run --silent build

ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

CMD npm run --silent start

