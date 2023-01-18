FROM node:18-alpine

ENV TZ=America/Sao_Paulo
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV GENERATE_SOURCEMAP=false

WORKDIR /app

COPY package*.json ./

# --production=false para instalar tudo
RUN npm install --legacy-peer-deps --production=false

COPY . .

RUN npm run build

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

CMD npm run --silent start

