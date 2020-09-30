FROM node:14.11.0-alpine3.10 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM node:14.11.0-alpine3.10
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]