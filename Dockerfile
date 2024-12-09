FROM node:18-alpine as build

RUN npm i -g pnpm

WORKDIR /app
COPY package.json /app
RUN pnpm i
COPY . /app

RUN pnpm generate

FROM nginx:alpine as prod
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
