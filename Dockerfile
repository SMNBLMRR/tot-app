
FROM node:20-alpine as base
WORKDIR /app

FROM base as build
COPY ./package.json .
RUN npm i
COPY . .
RUN npm run build

FROM base
COPY --from=build ./app/package.json ./
COPY --from=build ./app/dist ./dist
COPY --chown=node:node --from=build /app/prisma /app/
RUN npm run prisma:generate

EXPOSE 3000
CMD [ "npm", "start" ]

