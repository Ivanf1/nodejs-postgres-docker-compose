# stage 1 building
FROM node:16-alpine3.11 AS build

# create a directory for the app
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

COPY ./knexfile.ts ./knexfile.js
COPY ./.env ./

# install dependencies
RUN npm install

COPY . .

RUN npm run build

###############################################################

# stage 2 final
FROM node AS final

RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

# switch to user node
USER node

ENV NODE_ENV=development

RUN npm ci --only=production

# copy code files and give ownership to user node
COPY --from=build --chown=node:node /app/dist ./dist

COPY --from=build --chown=node:node /app/knexfile.js ./
COPY --from=build --chown=node:node /app/.env ./

EXPOSE 4000

CMD node ./dist/index.js