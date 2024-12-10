FROM node:22 as build

# set node env as development
# ENV NODE_ENV=development
RUN npm i -g pnpm

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

RUN pnpm build

FROM nginx:alpine as prod
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
