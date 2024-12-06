FROM node:18-alpine as build

RUN npm i -g pnpm

WORKDIR /app
COPY package.json /app
RUN pnpm i
COPY . /app





RUN pnpm build
FROM gcr.io/distroless/nodejs:18 as prod
WORKDIR /app
COPY --from=build /app/.output/server /app/.output/server
EXPOSE 3000/tcp
CMD ["/app/.output/server/index.mjs"]



