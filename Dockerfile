FROM node:18-alpine3.15 as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY .docker ./.docker/

# Install app dependencies
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM node:18-alpine3.15

RUN apk add --no-cache bash

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.docker ./.docker

RUN yarn install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 8080

ENTRYPOINT [ ".docker/entrypoint.sh" ]
