FROM node:22-slim AS build

# set node env as development
ENV NODE_ENV=production
# Enable pnpm

RUN npm i -g pnpm

WORKDIR /app
COPY package.json .
COPY . .
RUN pnpm i --frozen-lockfile  


RUN pnpm build

FROM nginx:alpine AS prod
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
