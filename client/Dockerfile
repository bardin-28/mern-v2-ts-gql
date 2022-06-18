### build environment
ARG NODE_VERSION=16-alpine
FROM node:${NODE_VERSION} as build

ARG NPM_VERSION=8.5
RUN npm -g i npm@${NPM_VERSION}

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS="--max_old_space_size=4096"

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

ARG ENV=local
RUN if [[ ! -f ".env.$ENV" && -f ".env.$ENV.example" ]]; then cp ".env.$ENV.example" ".env.$ENV"; fi
RUN cp ".env.$ENV" .env

ARG BUILD_SCRIPT=build
RUN npm run ${BUILD_SCRIPT}

### production environment
FROM nginx:stable-alpine

ARG BUILD_PATH=build
COPY --from=build /app/$BUILD_PATH /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
